import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchViewComponent } from './album-search-view.component';

describe('AlbumSearchViewComponent', () => {
  let component: AlbumSearchViewComponent;
  let fixture: ComponentFixture<AlbumSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumSearchViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
