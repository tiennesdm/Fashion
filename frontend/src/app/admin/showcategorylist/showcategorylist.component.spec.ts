import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcategorylistComponent } from './showcategorylist.component';

describe('ShowcategorylistComponent', () => {
  let component: ShowcategorylistComponent;
  let fixture: ComponentFixture<ShowcategorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcategorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
