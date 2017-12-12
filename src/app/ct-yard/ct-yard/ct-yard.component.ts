import { 
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import { YardposInfo } from '../../model/yardpos-info';
import { CtYardposParserService } from '../../tool';


@Component({
  selector: 'ct-yard',
  templateUrl: './ct-yard.component.html',
  styleUrls: ['./ct-yard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtYardComponent implements OnInit, OnChanges {
  host: d3.Selection<any, any, any, any>;
  svg: d3.Selection<any, any, any, any>;
  yardGroup: d3.Selection<any, any, any, any>;
  rowLabelsGroup: d3.Selection<any, any, any, any>;
  oddBayLabelsGroup: d3.Selection<any, any, any, any>;
  evenBayLabelsGroup: d3.Selection<any, any, any, any>;
  displayYardposInfoList: YardposInfo[] = [];

  baseWidth = 6;
  baseHeight = 12;

  interval = 1;

  maxRow = 6;
  maxTier = 5;
  maxBay = 0;

  canvasWidth = 2000;
  canvasHeight = 100;

  pods = [];
  podColor;

  @Input() yardposInfoList: YardposInfo[] = [];  

  @Output() onYardposClicked: EventEmitter<YardposInfo> = new EventEmitter();

  constructor(private el: ElementRef, private yardposParser: CtYardposParserService) { }

  ngOnInit() {
    this.host = d3.select(this.el.nativeElement);
    this.svg = this.host.select('svg')
      .attr('width', this.canvasWidth + 'px')
      .attr('height', this.canvasHeight + 'px');
    this.yardGroup = this.svg.append('g')
      .attr('class', 'ct-yard-group')
      .attr('transform', 'translate(20, 20)');

    this.rowLabelsGroup = this.svg.append('g')
      .attr('class', 'row-labels-group')
      .attr('transform', 'translate(0, 20)');

    this.oddBayLabelsGroup = this.svg.append('g')
      .attr('class', 'odd-bay-labels-group')
      .attr('transform', 'translate(20, 0)');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['yardposInfoList']) {
      setTimeout(() => {
        this.extractBasicInfo();
        this.processData();
        this.redraw();
      },0);
    }
  }


  /**
   * 从场地位置信息数组中剔除箱区基础数据，即:
   * maxBay: 小贝个数
   * maxRow: 最大列
   * maxTier: 最大层
   * pods: 所有卸货港数组
   */
  extractBasicInfo() {
    // TODO: 改用CtYardBayParser解析贝、列、层
    this.maxRow = Math.max(...this.yardposInfoList.map(d => +this.yardposParser.getP(d.yardpos)));
    this.maxTier = Math.max(...this.yardposInfoList.map(d => +this.yardposParser.getC(d.yardpos)));
    this.maxBay = d3.set(this.yardposInfoList.map(d => +this.yardposParser.getW(d.yardpos)).filter(bay => bay % 2 === 1)).values().length;

    this.pods = d3.set(this.yardposInfoList.filter(pos => pos.container && pos.container.pod), (pos) => pos.container.pod).values();
    this.podColor = d3.scaleOrdinal(d3.schemeCategory20);
  }

  // TODO: BUG 如果偶数贝存在定位组信息，则其对应的基数贝也存在定位组信息，这时候应当只画偶数贝
  processData() {
    // TODO: 改用CtYardBayParser解析贝、列、层
    this.displayYardposInfoList = [];
    let bayInfo = [];
    // 计算每个场地位置是否含有集装箱、任务、计划
    this.yardposInfoList.forEach((pos, idx) => {
      let bay = +this.yardposParser.getW(pos.yardpos);
      if (bayInfo[bay]) {
        if ((pos.container && pos.container.ctnno) || pos.plans.length > 0 || pos.tasks.length > 0 ) {
          bayInfo[bay] += 1;
        }   
      } else {
        if ((pos.container && pos.container.ctnno) || pos.plans.length > 0 || pos.tasks.length > 0 ) {
          bayInfo[bay] = 1;
        } else {
          bayInfo[bay] = 0;
        }
      }
    });
    console.log(bayInfo);

    bayInfo.forEach((count, idx) => {
      if (count > 0) {
        let poses = this.yardposInfoList.filter(pos => +this.yardposParser.getW(pos.yardpos) === idx);
        this.displayYardposInfoList = [...poses, ...this.displayYardposInfoList]
      } else if( (idx) % 2 === 1 && 
                  (bayInfo[idx + 1] === undefined || bayInfo[idx + 1] === 0) &&
                  (bayInfo[idx - 1] === undefined || bayInfo[idx - 1] === 0)) {
        // 如果是基数贝，则向前向后找其偶数倍是否存在占位信息，若不存在则需要画该基数贝
        let poses = this.yardposInfoList.filter(pos => +this.yardposParser.getW(pos.yardpos) === idx);
        this.displayYardposInfoList = [...poses, ...this.displayYardposInfoList]
      }
    });
  }

  redraw() {
    // 绘制列标签
    let rowLabels = this.rowLabelsGroup
      .selectAll('g.row-label')
      .data(d3.range(this.maxRow));
    
    let rowLabel = rowLabels.enter().append('g')
      .attr('class', 'row-label')
      .attr('transform', (data) => {
        return `translate(0, ${data * this.baseHeight})`
      });
    rowLabel.append('text')
      .attr('width', 20)
      .attr('height', this.baseHeight)
      .attr('font-size', '9')
      .attr('text-anchor', 'middle')
      .attr('dx', 15)
      .attr('dy', this.baseHeight / 1.2)
      .text(c => c + 1);
    rowLabels.exit().remove();

    // 绘制基数贝标签
    let oddBayLabels = this.oddBayLabelsGroup
      .selectAll('g.odd-bay-label')
      .data(d3.range(0, this.maxBay * 2, 2));
    let oddBayLabel = oddBayLabels.enter().append('g')
      .attr('class', 'odd-bay-label')
      .attr('transform', (data, idx) => {
        return `translate(${idx * this.baseWidth * this.maxTier + this.interval * data}, 0)`
      });
    oddBayLabel.append('text')
      .attr('width', (data, idx) => idx * this.baseWidth * this.maxTier + this.interval * data)
      .attr('height', 20)
      .attr('font-size', '9')
      .attr('text-anchor', 'middle')
      .attr('dx', 12)
      .attr('dy', this.baseHeight)
      .text(c => c + 1);
    oddBayLabels.exit().remove();

    //TODO: 绘制偶数贝标签

    




    let yardPoses = this.yardGroup
      .selectAll('g.yardpos')
      .data(this.displayYardposInfoList, (data) => JSON.stringify(data));

    let pos = yardPoses.enter().append('g')
      .attr('class', 'yardpos')
      .attr('transform', (data) => {
        let x = (+this.yardposParser.getP(data.yardpos)) * this.baseWidth;
        let y = (this.maxTier - (+this.yardposParser.getC(data.yardpos))) * this.baseHeight;
        return `translate(${x}, ${y})`;
      })
      .on('click', (data) => {
        console.log(data);
        this.onYardposClicked.emit(data);

      });
    pos.transition()
    .delay((posInfo: YardposInfo) => {
      let bay = +this.yardposParser.getW(posInfo.yardpos);
      let row = +this.yardposParser.getP(posInfo.yardpos);
      let tier = +this.yardposParser.getC(posInfo.yardpos);
      
      return bay * 10 + (row) * 10 + tier * 10;
    })
    .attr('transform', (posInfo: YardposInfo) => {
      let x = 0
      let bay = +this.yardposParser.getW(posInfo.yardpos);
      let row = +this.yardposParser.getP(posInfo.yardpos);
      let tier = +this.yardposParser.getC(posInfo.yardpos);
      if (bay % 2 === 1) {
        // 基数贝
        x = (bay - 1) / 2 * (this.maxTier * this.baseWidth);
        x = x + (tier - 1) * this.baseWidth;
      } else {
        x = ((bay / 2) - 1) * (this.maxTier * this.baseWidth);
        x = x + (tier - 1) * this.baseWidth * 2;
      }
      x = x + (bay - 1) * this.interval;
      let y = this.baseHeight * (row - 1);
      return `translate(${x}, ${y})`;
    });

    pos.append('path')
    .attr('d', (data) => {
      let bay = +this.yardposParser.getW(data.yardpos);
      let width = 0;
      if (bay % 2 === 1) {
        // 基数贝
        width = this.baseWidth;
      } else {
        width = this.baseWidth * 2;
      }
      
      let baseRect = `M0 0 L${width} 0 L${width} ${this.baseHeight} L0 ${this.baseHeight} Z`;
      let finalRect = baseRect;
      if (data.isLocked ) {
        //有封场则画X表示
        finalRect = finalRect + ` M0 0 L${width} ${this.baseHeight} M${width} 0 L0 ${this.baseHeight}`

      }
      if (data.tasks.length > 0) {
        //有任务占位则画圈表示
        finalRect = finalRect + ` M0 ${this.baseHeight / 2} A${width / 2} ${width / 2} 0 0 1 ${width} ${this.baseHeight / 2}  M${width} ${this.baseHeight / 2} A${width / 2} ${width / 2} 0 0 1 ${0} ${this.baseHeight / 2}`

      }
      return finalRect

    })
    .attr('fill', (data) => {
      if (data.container && data.container.ctnno) {
        return this.podColor(data.container.pod);
      } else if (data.plans.length > 0) {
        if (data.plans.filter(p => p.planType === '定位组').length > 0) {
          return 'lightgrey';
        }
        // if (data.plans.filter(p => p.planType === '定位组').length > 0) {
        //   return 'rgb(139,172,161)';
        // }
        return 'white'
      } else {
        return 'white';
      }
    })
    .attr('stroke', 'rgb(90,68,70)')
    .attr('stroke-width', '1px');
    yardPoses.exit()
    .remove();


  }



}
