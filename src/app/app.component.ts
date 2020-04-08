import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {noop, timer} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  globalTotal: any = {};

  countryData: any;

  dateAvailability = true;

  displayedColumns: string[] = ['countryInfo', 'country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'critical',
    'updated'];

  dataSource;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.getCountries();
    this.getAll();
  }

  getAll() {
    this.http.get('all').subscribe(
      (data: any) => {
        this.globalTotal = data;
      },
      noop,
      noop
    );
  }

  getCountries() {
    this.http.get('countries').subscribe(
      (data: any) => {
        this.countryData = data;
        this.dateAvailability = true;
        this.dataSource = new MatTableDataSource(this.countryData);
      },
      () => {
        this.dateAvailability = false;
      },
      noop
    );
  }

}
