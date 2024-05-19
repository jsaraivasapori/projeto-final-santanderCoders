import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationalModalComponent } from './informational-modal.component';


describe('InformationalModalComponent', () => {
  let component: InformationalModalComponent;
  let fixture: ComponentFixture<InformationalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
