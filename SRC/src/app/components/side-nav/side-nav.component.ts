import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface tournamentSizeOptions {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() isOpen!: boolean;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  public teams: string[] = [];
  public title!: string;
  public alert!: string;
  public tournamentSize!: number;
  public form: FormGroup = this.createForm();
  tournamentSizeOptions: tournamentSizeOptions[] = [
    {value: 2, viewValue: '2 teams'},
    {value: 4, viewValue: '4 teams'},
    {value: 8, viewValue: '8 teams'},
    {value: 16, viewValue: '16 teams'},
    {value: 32, viewValue: '32 teams'},
  ];


  
  constructor(private formBuilder: FormBuilder) {}

  closeSideNav() {
    // Function used to hide this component by passing that IsOpen has changed to false;
    this.isOpen = false;
    this.closed.emit();
  }

  createForm(): FormGroup {
    // Function used to create a form that will store tournament data;
    return this.formBuilder.group({
      tournamentTitle: [this.title, [Validators.required]],
      tournamentSize: [this.tournamentSize, [Validators.required]],
      teams: [this.teams, [Validators.required]],
      team: '',
    });
  }

  selectBoxChange(value: any) {
    // Get the new value of tournament size's combobox;
    this.tournamentSize = value;
  }

  submitForm() {
    // If the form is valid, it will send it to the parent to display a new tournament board;
    if (this.form.status === 'VALID') {
      this.formValue.emit(this.form.value);
      this.form.reset();
      this.teams = [];
      this.form.get('team')?.setValue('');
    }
  }

  deleteTeam(index: number) {
    // Function used to delete an team from tournament team's list;
    this.teams.splice(index, 1);
    this.form.get('teams')?.setValue(this.teams);
  }

  addTeam(event: string) {
    // Function used to add a new team to tournament team's list checking if its already in the list;
    const exists = this.teams.findIndex( item =>  event.toLowerCase() === item.toLowerCase());
    if (event.trim()) {
      if(exists > -1) {
        this.alert = 'Time já cadastrado! Por favor digite outro nome de time.'
      } else {
        this.alert = '';
        this.teams.push(event);
        this.form.get('teams')?.setValue(this.teams);
        this.form.get('team')?.setValue('');
      }
    }
  }

  formValid() {
    // Function used to check if form's data is valid so it can be send to plot a new tournament board;
    return this.form.valid && this.tournamentSize === this.teams.length;
  }
}
