import { Component, OnInit, Input } from '@angular/core';
import { ArtserService } from '../artser.service';
import { Kbarticle } from '../kbarticles';
import { Pageinfo } from '../pagerinfo';
import { NgbModal, ModalDismissReasons, NgbModalConfig, NgbTabsetConfig, NgbToastConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Ddlcategory } from '../ddlcategories';

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [
  {
    type: 'danger',
    message: 'Something went wrong',
  }
];
@Component({
  selector: 'app-mat',
  templateUrl: './mat.component.html',
  styleUrls: ['./mat.component.css']
})
export class MatComponent implements OnInit {
images = [ '/assets/photo-1454165804606-c3d57bc86b40-845x321.jpg', '/assets/images (2).jpg', '/assets/images.jpg'];
art: Kbarticle[];
allart: Kbarticle[];
pageart: Pageinfo;
totalpage: number;
totalitem: number;
Page= 1;
readarr: Kbarticle;
arr3: Kbarticle[]=[];
page: number;
pageshow: boolean=false;
kbase: FormGroup;
login: FormGroup;
closeResult: string;
catarr: Ddlcategory[];
show = false;
autohide = true;
show1 = false;
autohide1=true;
show2=false;
autohide2=true;
show3=false;
autohide3=true;
show4=false;
autohide4=true;
alerts: Alert[];
display:boolean=false;
  constructor(private fb:FormBuilder,private data:ArtserService,private con1:NgbToastConfig,private modalService:NgbModal,private config:NgbModalConfig,private con:NgbTabsetConfig) {
    config.backdrop='static';
    config.keyboard=false;
    this.reset();
    con.justify='start';
    con.type='tabs';
  }
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }
  ngOnInit() {

    this.getArticles();

    this.kbase=this.fb.group({
      articleId:new FormControl(),
      articleName:new FormControl(null,[Validators.pattern('[ a-zA-Z]*'),Validators.required]),
      content:new FormControl(null,[Validators.pattern('[ a-zA-Z]*'),Validators.required]),
      previewContent:new FormControl(),
      categoryId:new FormControl(),
      categoryName: new FormControl(),
      createdBy:new FormControl(),
      createdByName: new FormControl(),
      createdDate: new FormControl(),
      modifiedBy: new FormControl(),
      modifiedByName: new FormControl(),
      modifiedDate:new FormControl()
    });

    this.login=this.fb.group({
      useremail:new FormControl(null,Validators.required),
      userpassword:new FormControl(null,Validators.required)
    });

    this.getPageInfo();
    this.getcat();

  }

  // get all articles

  getArticles() {

    this.data.getAllKbArticles().subscribe(

      (data:Kbarticle[])=>{
        this.art=data;
        this.allart=this.art['kbArticles'];
        this.pageshow=true;
      },
      function(error) {
        // alert(error.message);
        this.display = true;
        this.show2 = true;
      },
      function() {
      }
    );
  }

  // getpage info

  getPageInfo(){
    this.data.getAllKbArticles().subscribe(
      (data:Kbarticle[])=>{
        this.art=data;
        this.pageart=this.art['pagerInfo'];
        console.log(this.pageart);
        this.totalitem=this.pageart.totalItems;
        this.totalpage=this.pageart.totalPages;
    }
  );
}

  // load new page

  showPage(num){
    console.log(num);
    // this.page=num[0];
    // console.log(this.page);
    if(num!=0){
      this.data.getpagebynumber(num).subscribe(
        (data:any)=>{
          this.arr3=data;
          console.log(this.arr3);
          this.allart=this.arr3['kbArticles'];
        }
      );
    }
  }

  // readmore popup open

  readmore(content,item){
    this.modalService.open(content, {
      size:'xl'
    });
    console.log(item.articleId);
    this.data.getarticlebyid(item.articleId).subscribe(
      (data:any)=>{
        this.readarr=data;
        console.log(this.readarr);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // edit popup open

  openEdit(editpop,item){
    console.log(item.articleId);
    this.modalService.open(editpop, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.kbase.patchValue({
      articleId:item.articleId,
      articleName:item.articleName,
      categoryId:item.categoryId,
      content:item.content
    });
  }
  // add popup open

  openAdd(addpop){
    this.modalService.open(addpop, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

// get categories

  getcat(){
    this.data.getcategories().subscribe(
      (data:any)=>{
        this.catarr=data;
        console.log(this.catarr);
      }
    );
  }

// add new record

  onadd(item){
    this.data.insertrecord(item).subscribe(
      (data:any)=>{
        this.getArticles();
        this.show=true;
        this.modalService.dismissAll();
      },function(error){
      },
      function(){}
    );
  }

  // update article

  articleSave(item){
    console.log(item);
    this.data.updateuser(item).subscribe(
    (data:any)=>{
      this.show1=true;
      this.getArticles();
      this.modalService.dismissAll();
    }
  );
  }

//Login method

  onLoginSubmit(){
    this.data.login(
      this.login.value.useremail,
      this.login.value.userpassword
    );
    if(this.data.loggedinuser.admin){
    console.log(this.data.loggedinuser);
     this.show3=true;
    }else{
     this.show4=true;
    }
  }

// is user logged in

  isLoggedIn(){
    return this.data.isLoggedIn;
  }

//log out method

  onLogOut(){
    this.data.logout();
  }

}
