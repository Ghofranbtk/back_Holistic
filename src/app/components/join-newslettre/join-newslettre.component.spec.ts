import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinNewslettreComponent } from './join-newslettre.component';

describe('JoinNewslettreComponent', () => {
  let component: JoinNewslettreComponent;
  let fixture: ComponentFixture<JoinNewslettreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinNewslettreComponent]
    });
    fixture = TestBed.createComponent(JoinNewslettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
