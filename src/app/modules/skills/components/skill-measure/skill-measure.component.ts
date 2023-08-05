import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { Language } from 'src/app/enums/language.enum';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-skill-measure',
  templateUrl: './skill-measure.component.html',
  styleUrls: ['./skill-measure.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkillMeasureComponent implements OnInit, AfterViewInit {

  @Input() value: number = 0;
  @Input() name: string = '';
  @Input() numberOfCircles: number = 5;

  public minified = false;
  public visible = true;
  public circles: { index: number; filled: boolean }[] = [];

  public readonly selectedLanguage$ = new Observable<Language>();

  constructor(
    private elRef: ElementRef,
    private languageService: LanguageService
  ) {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage();
  }

  ngOnInit() {
    this.circles = Array(this.numberOfCircles).fill(0).map((_, i) => ({ index: i, filled: false }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      for (let circle of this.circles) {
        circle.filled = circle.index < this.value
      }
    }, 600);
  }

  hideComponent() {
    const element = this.elRef.nativeElement as HTMLElement;
    element.style.display = 'none';
  }
}
