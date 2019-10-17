import { Component, OnInit } from '@angular/core';
import { ArtserService } from '../artser.service';
import { Kbarticle } from '../kbarticles';
import { Pageinfo } from '../pagerinfo';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Ddlcategory } from '../ddlcategories';

@Component({
  selector: 'app-mat',
  templateUrl: './mat.component.html',
  styleUrls: ['./mat.component.css']
})
export class MatComponent implements OnInit {
images = [ '/assets/photo-1454165804606-c3d57bc86b40-845x321.jpg','/assets/images (2).jpg', '/assets/images.jpg'];
art:Kbarticle[];
allart:Kbarticle[];
pageart:Pageinfo;
totalpage:number;
totalitem:number;
Page=1;
readarr:Kbarticle;
arr3:Kbarticle[]=[];
page:number;
pageshow:boolean=false;
kbase:FormGroup;
closeResult:string;
catarr:Ddlcategory[];
  constructor(private fb:FormBuilder,private data:ArtserService,private modalService:NgbModal,private config:NgbModalConfig) {
    config.backdrop='static';
    config.keyboard=false;
  }
  ngOnInit() {
    this.kbase=this.fb.group({
      articleId:new FormControl(),
      articleName:new FormControl(null,Validators.pattern('[a-zA-Z]*')),
      content:new FormControl(),
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

    this.getArticles();
    this.getPageInfo();
  }
  getArticles(){
    this.data.getAllKbArticles().subscribe(
      (data:Kbarticle[])=>{
        this.art=data;
        this.allart=this.art['kbArticles'];
        this.pageshow=true;
      }
    );
  }
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
  openEdit(editpop,item){
    this.modalService.open(editpop, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openAdd(addpop){
    this.modalService.open(addpop, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getcat(){
    this.data.getcategories().subscribe(
      (data:any)=>{
        this.catarr=data;
      }
    );
  }
}
