import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCredentialsComponent } from './player-credentials.component';

describe('PlayerCredentialsComponent', () => {
  let component: PlayerCredentialsComponent;
  let fixture: ComponentFixture<PlayerCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
