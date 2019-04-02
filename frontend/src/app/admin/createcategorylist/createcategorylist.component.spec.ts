import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecategorylistComponent } from './createcategorylist.component';

describe('CreatecategorylistComponent', () => {
  let component: CreatecategorylistComponent;
  let fixture: ComponentFixture<CreatecategorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecategorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
