import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Language } from 'src/app/enums/language.enum';
import { LanguageService } from 'src/app/services/language.service';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill-measure',
  templateUrl: './skill-measure.component.html',
  styleUrls: ['./skill-measure.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkillMeasureComponent implements OnInit, AfterViewInit {

  @Input() value: number = 0;
  @Input() minValue: number = 0;
  @Input() name: string = '';
  @Input() numberOfCircles: number = 7;

  public circles: { index: number; filled: boolean }[] = [];

  public readonly selectedLanguage$ = new Observable<Language>();

  private skills = inject(SkillsService);

  constructor(
    private elRef: ElementRef,
    private languageService: LanguageService
  ) {
    this.selectedLanguage$ = this.languageService.getSelectedLanguage();
  }

  ngOnInit() {
    this.circles = Array(this.numberOfCircles).fill(0).map((_, i) => ({ index: i, filled: false }));
    if (this.skills.minified) {
      if (this.minValue && this.value < this.minValue) {
        this.hideComponent();
      }
    }
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
