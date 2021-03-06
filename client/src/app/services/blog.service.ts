import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {AuthService} from "./auth.service";

@Injectable()
export class BlogService {
  options;
  domain = this.authService.domain;
  constructor(
    private authService: AuthService,
    private http: Http
  ) { }
// Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
    console.log(this.options);
  }

  // Function to create a new blog post
  newBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/blog/newBlog', blog, this.options).map(res => res.json());
  }
  // Function to get all blogs from the database
  getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/blog/allBlogs', this.options).map(res => res.json());
  }
  // Function to get the blog using the id
  getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/blog/singleBlog/' + id, this.options).map(res => res.json());
  }
  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/blog/updateBlog/', blog, this.options).map(res => res.json());
  }
  // Function to delete a blog
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + '/blog/deleteBlog/' + id, this.options).map(res => res.json());
  }
}
