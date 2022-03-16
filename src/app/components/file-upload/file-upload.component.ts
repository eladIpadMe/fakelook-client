import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { empty } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

  
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() pictureUploaded = new EventEmitter<string>();
  
    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File | undefined; // Variable to store file
    src: string= "";
    pictureUplouded: boolean= false;
  
    // Inject service 
    constructor(private fileUploadService: FileUploadService) { }
  
    ngOnInit(): void {
    }
  
    // On file Select
    onChange(event: any) {
        this.file = event.target.files[0];
        //this.src = event.target.files[0].name;
        this.pictureUplouded = !this.pictureUplouded;
        // console.log(this.file);
        // console.log(this.pictureUplouded);
        

        if(this.file){
          
          var reader =new FileReader();
          reader.onload = (e: any) => {
            this.src = e.target.result;
            this.pictureUploaded.emit(this.src);
            console.log("src is: "+this.src);
          }
          reader.readAsDataURL(this.file);
         
        }

        

    }
  
    // OnClick of button Upload
    // onUpload() {
    //     this.loading = !this.loading;
        
        
    //     this.fileUploadService.upload(this.file).subscribe(
    //         (event: any) => {
    //             if (typeof (event) === 'object') {
  
    //                 // Short link via api response
    //                 this.shortLink = event.link;
  
    //                 this.loading = false; // Flag variable 
    //             }
    //         }
    //     );
    // }
}
