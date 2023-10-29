import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plant } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  plantId: string = '';
  plant!: Plant;
  routeSub: Subscription = new Subscription();
  plantSub: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.plantId = params['id'];
      this.getPlantDetails(this.plantId);
    });
  }

  getPlantDetails(id: string): void {
    this.plantSub = this.httpService.getPlantDetails(id).subscribe(
      (description: Plant) => {
        this.plant = description;
      },
      (error) => {
        console.error('Error occurred while fetching plant details:', error);
      }
    );
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
