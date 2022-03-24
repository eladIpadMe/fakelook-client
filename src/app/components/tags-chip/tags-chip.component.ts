import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Tag } from 'src/app/models/tag.model';
import { map, Observable, startWith } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HashtagService } from 'src/app/services/hashtag.service';

@Component({
  selector: 'app-tags-chip',
  templateUrl: './tags-chip.component.html',
  styleUrls: ['./tags-chip.component.scss']
})
export class TagsChipComponent implements OnInit {
separatorKeysCodes: number[] = [ENTER, COMMA];

@Input() placeHolder: string;
@Output() tagsChosen = new EventEmitter<string[]>();
@ViewChild('hashtagInput') hashtagInput: ElementRef<HTMLInputElement>;

hashtagCtrl = new FormControl();
hashtags: string[] = [];
allHashtags: Tag[] = [];
stringAllHashtags: string[] = [];
filteredHashtags: Observable<string[]>;

  constructor(private hashtagService: HashtagService) {
  //get all hashtags
  this.hashtagService.getAllTags().subscribe((tags)=>{
    this.allHashtags = tags;
    this.allHashtags.forEach(t => {
      this.stringAllHashtags[<number>t.id] = t.content;
    })
    this.stringAllHashtags = this.stringAllHashtags.slice(1);
    console.log(this.stringAllHashtags);
    
    this.filteredHashtags = this.hashtagCtrl.valueChanges.pipe(
      startWith(null),
      map((hashtag: string | null) => (hashtag ? this._filter(hashtag) : this.stringAllHashtags.slice(0, this.stringAllHashtags.length-1))),
    );
    console.log(this.stringAllHashtags);
    console.log(this.filteredHashtags);
  },
  (error)=> console.log(error));
   }

  ngOnInit(): void {
  }
  addHashtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      let tagAlreadyExits = false;
      this.allHashtags.forEach(t=>{
        if(t.content == value)
          tagAlreadyExits = true;
      });
      if(!tagAlreadyExits)
      this.hashtags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.hashtagCtrl.setValue(null);
  }


  removeHashtag(hashtag: string): void {
    const index = this.hashtags.indexOf(hashtag);

    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
  }
//get hashtags input from user
  selectedHashtags(event: MatAutocompleteSelectedEvent): void {
    this.hashtags.push(event.option.viewValue);
    this.hashtagInput.nativeElement.value= '';
    this.hashtagCtrl.setValue(null);
    console.log(this.hashtags);
    this.tagsChosen.emit(this.hashtags);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stringAllHashtags.slice(0, this.stringAllHashtags.length-1)
    .filter(hashtag => 
    hashtag.toLowerCase().includes(filterValue)
  );
  }
  
}
