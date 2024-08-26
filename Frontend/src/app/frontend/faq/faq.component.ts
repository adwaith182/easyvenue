import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs = [
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },

    // Add more FAQs as needed
  ];

  activeIndex: number | null = null;

  // Data from LinkComponent
  frequentSearches: string[] = [];
  nearMeSearches: string[] = [];
  localitySearches: string[] = [];
  relatedSearches: string[] = [];
  selectedCity: string = 'Mumbai'; // Default city

  constructor() { }

  ngOnInit(): void {
    this.updateSearches();
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  updateSearches() {
    this.frequentSearches = [
      `Affordable Banquet Halls in ${this.selectedCity}`,
      `Banquet Halls in ${this.selectedCity}`,
      `AC Banquet Halls in ${this.selectedCity}`,
      `Top Banquet Halls in ${this.selectedCity}`,
      `Best Banquet Halls with price in ${this.selectedCity}`,
      `Banquet Halls with review in ${this.selectedCity}`,
      `Luxury Banquet Halls in ${this.selectedCity}`,
      `Best Banquet Halls in ${this.selectedCity}`,
      `List of Banquet Halls in ${this.selectedCity}`,
      `Cheap Banquet Halls in ${this.selectedCity}`,
      `Best banquets in ${this.selectedCity}`,
      `Banquet Halls nearby ${this.selectedCity}`,
      `Banquet Halls near ${this.selectedCity}`
    ];

    this.nearMeSearches = [
      'Affordable Banquet Halls near me',
      'Banquet Halls near me',
      'AC Banquet Halls near me',
      'Top Banquet Halls near me',
      'Best Banquet Halls with price near me',
      'Banquet Halls with review near me',
      'Luxury Banquet Halls near me',
      'Best Banquet Halls near me',
      'List of Banquet Halls near me',
      'Cheap Banquet Halls near me',
      'Best banquets near me',
      `Banquet Halls nearby ${this.selectedCity}`,
      `Banquet Halls near ${this.selectedCity}`
    ];

    this.localitySearches = [
      'Banquet Halls in Locality1',
      'Banquet Halls in Locality2',
      'Banquet Halls in Locality3',
      'Banquet Halls in Locality4',
      'Banquet Halls in Locality5',
      'Banquet Halls in Locality6'
    ];

    this.relatedSearches = [
      `Wedding Venues in ${this.selectedCity}`,
      `Marriage Halls in ${this.selectedCity}`,
      `Mantapa / Convention Hall in ${this.selectedCity}`,
      `Wedding Lawns in ${this.selectedCity}`,
      `Destination Wedding Venues in ${this.selectedCity}`,
      `5 Star Wedding Hotels in ${this.selectedCity}`,
      `Party Halls in ${this.selectedCity}`,
      `Cocktail Venues in ${this.selectedCity}`,
      `Birthday Party Halls in ${this.selectedCity}`,
      `Party Plots in ${this.selectedCity}`,
      `Terrace Banquet Halls in ${this.selectedCity}`,
      `Corporate Event Venues in ${this.selectedCity}`,
      `Wedding Resorts in ${this.selectedCity}`,
      `Wedding Hotels in ${this.selectedCity}`,
      `Villa / Farmhouse in ${this.selectedCity}`,
      `Heritage Wedding Venues in ${this.selectedCity}`
    ];
  }

  onCityChange(city: string) {
    this.selectedCity = city;
    this.updateSearches();
  }
}
