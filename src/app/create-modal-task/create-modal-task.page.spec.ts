import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateModalTaskPage } from './create-modal-task.page';

describe('CreateModalTaskPage', () => {
  let component: CreateModalTaskPage;
  let fixture: ComponentFixture<CreateModalTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateModalTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModalTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
