import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input text', () => {
    component.text = 'Test Link';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Link');
  });

  it('should have correct href attribute', () => {
    component.href = 'https://example.com';
    fixture.detectChanges();
    const linkElement: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.href).toContain('https://example.com');
  });

  it('should emit click event', () => {
    spyOn(component.clicked, 'emit');
    const linkElement: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    linkElement.click();
    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
