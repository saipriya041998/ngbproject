import { Injectable } from '@angular/core';
import { appconstant } from './app.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtserService {
  display_url = appconstant.api + 'GetArticles?getall=0&categ=';
  page_url = appconstant.api + 'GetArticles?getall=0&categ=&Page=';
  readmore_url = appconstant.api + 'GetReadArticle?ArticleId=';
  getcateg = appconstant.api + 'GetCategories';
  add_article = appconstant.api + 'InsertUpdateKBAricles';
  update = appconstant.api + 'InsertUpdateKBAricles';
  concat: string;
  loggedinuser;
  signupuser;
  constructor(private http: HttpClient) { }

// to get all records to display

  getAllKbArticles(){
    return this.http.get(this.display_url);
  }

  getpagebynumber(num){
    return this.http.get(this.page_url + num);
  }

  getarticlebyid(item){
    return this.http.get(this.readmore_url + item);
  }

  getcategories(){
    return this.http.get(this.getcateg);
  }
  insertrecord(item){
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.add_article, body, {headers: head});
  }

  updateuser(item){
    console.log(item);
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.update, body, {headers: head});
  }



  login(useremail: string, userpassword: string){
    if (useremail === 'admin' && userpassword === '123'){
      this.loggedinuser = {
        useremail: useremail,
        userpassword: userpassword,
        admin: true
      };
      // alert('admin is logged in');
      return ;
    }
    else if (useremail === this.signupuser.email && userpassword === this.signupuser.password) {
       this.loggedinuser = {
        useremail: useremail,
        userpassword: userpassword,
        admin: false
    };
      alert('  '+this.signupuser.email+' is logged in ');
    } else {
      alert('Please signup before login');
    }

  }

  logout(){
    this.loggedinuser = null;
  }

  get isLoggedIn(): boolean {
    return !!this.loggedinuser;
  }

  sign(username: string, email: string, password: string) {
    this.signupuser = {
      username: username,
      email: email,
      password: password
    };
    // this.signupuser.push(req);
    console.log(this.signupuser);
  }
}
