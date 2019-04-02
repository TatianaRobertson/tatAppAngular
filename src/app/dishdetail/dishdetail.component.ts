import { Component, OnInit, ViewChild  } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { DISHES } from  '../shared/dishes';


import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //@Input()
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('fform') commentFormDirective;

  formErrors ={
    'author':'',
    'comment':''
  }

  validationMessages = {
      'author': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 2 characters long.',
        'maxlength':     'Name cannot be more than 25 characters long.'
      },
      'comment': {
        'required':      'Comment is required.'
      }
    };

  constructor(private dishservice: DishService,
              private location: Location,
              private route: ActivatedRoute,
              private fb:FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating: '5'
    })

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //to reset form validation messages
  }

  onValueChanged(data? : any){
    if(!this.commentForm) {return;}
    const form = this.commentForm;

    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear old error validationMessages
        this.formErrors[field] ='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] +=messages[key]+' ';
            }
          }
        }
      }
    }
  }




  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);

    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish;
                           this.setPrevNext(dish.id);
                         });
  };

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length +index-1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length +index+1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    let currentDate = new Date();

    this.comment.date = currentDate.toISOString();
    this.dish.comments.push(this.comment);

    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''}
    );
    this.commentFormDirective.resetForm();
  }
}
