import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerConnectionPopupComponent } from './server-connection-popup.component';

describe('ServerConnectionPopupComponent', () => {
  let component: ServerConnectionPopupComponent;
  let fixture: ComponentFixture<ServerConnectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerConnectionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerConnectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
