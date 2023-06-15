import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CtComponent } from './ct.component';

describe('CtComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CtComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CtComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calories-tracking'`, () => {
    const fixture = TestBed.createComponent(CtComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('calories-tracking');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CtComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'calories-tracking app is running!'
    );
  });
});
