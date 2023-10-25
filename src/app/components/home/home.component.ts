import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Plant } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  public order: string = "";
  public plants: Array<Plant> = [];
  private routeSub: Subscription = new Subscription;
  private plantSub: Subscription = new Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {    
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['plant-search']) {
        this.searchPlants('', params['plant-search']);
      } else {
        this.searchPlants('');
      }
    });
  }

  searchPlants(order: string, search?: string): void {
    this.plantSub = this.httpService
      .getPlantList(order, search)
      .subscribe((plantList: APIResponse<Plant>) => {
        this.plants = plantList.data;
        console.log(plantList);        
      })
  }

  openPlantDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.plantSub) {
      this.plantSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
