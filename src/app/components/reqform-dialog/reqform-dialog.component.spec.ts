import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqformDialogComponent } from './reqform-dialog.component';

describe('ReqformDialogComponent', () => {
  let component: ReqformDialogComponent;
  let fixture: ComponentFixture<ReqformDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqformDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqformDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
