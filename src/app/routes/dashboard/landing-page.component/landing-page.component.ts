import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {DonorService} from "../../../shared/services/donor.service";
import {PostService} from "../../../shared/services/post.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-landing-page-component',
  templateUrl: './landing-page.component.html',
  styleUrls : ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private postService: PostService,
  ) {}

  posts: any[] = [];
  nearestPosts: any[] = [];
  loading=false;

  ngOnInit(): void {
    this.loading = true;
    this.postService.getAll()
      .subscribe((res:any)=>{
        this.posts=res;
        const currentDate = new Date();

        this.nearestPosts = this.posts
          .filter(post => new Date(post.eventDate) >= currentDate)
          .sort((a, b) => {
            const dateA = new Date(a.eventDate);
            const dateB = new Date(b.eventDate);
            return dateA.getTime() - dateB.getTime();
          })
          .slice(0, 3); // Get the first three nearest posts
        this.loading = false;
      });
  }

  redirect(data:any){
    const navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.router.navigate(['/dashboard/campaign-list'], navigationExtras);
  }

  navigate(place: string) {
    switch (place) {
      case 'eligibility':
        this.router.navigate(['/dashboard/eligibility']);
        break;
      case 'list':
        this.router.navigate(['/dashboard/list']);
        break;
      case 'benefits':
        this.router.navigate(['/dashboard/benefits']);
        break;
      default:
        break;
    }
  }
}
