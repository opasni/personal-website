import { Component } from '@angular/core';
import { ThemeComponent } from 'src/app/modules/share/abstracts/theme.component';
import { Lookup } from 'src/app/modules/share/classes/lookup.class';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends ThemeComponent {

  public publications: Lookup[] = [
    new Lookup('2008_40_1_iskre.pdf', 'Iskre - Letnik 40, št. 1', { issue: 40, nr: 1 }),
    new Lookup('2008_40_2_iskre.pdf', 'Iskre - Letnik 40, št. 2', { issue: 40, nr: 2 }),
    new Lookup('2008_40_3_iskre.pdf', 'Iskre - Letnik 40, št. 3', { issue: 40, nr: 3 }),
    new Lookup('2009_41_1_iskre.pdf', 'Iskre - Letnik 41, št. 1', { issue: 41, nr: 1 }),
    new Lookup('2009_41_2_iskre.pdf', 'Iskre - Letnik 41, št. 2', { issue: 41, nr: 2 }),
    new Lookup('2009_41_3_iskre.pdf', 'Iskre - Letnik 41, št. 3', { issue: 41, nr: 3 }),
    new Lookup('2010_42_1_iskre.pdf', 'Iskre - Letnik 42, št. 1', { issue: 42, nr: 1 }),
    new Lookup('2010_42_2_iskre.pdf', 'Iskre - Letnik 42, št. 2', { issue: 42, nr: 2 }),
    new Lookup('2010_42_3_iskre.pdf', 'Iskre - Letnik 42, št. 3', { issue: 42, nr: 3 }),
    new Lookup('2011_43_1_iskre.pdf', 'Iskre - Letnik 43, št. 1', { issue: 43, nr: 1 })
  ]
}
