import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import data from '../../../assets/demo/data/navigation.json';
import { ProductService } from '../../demo/service/productservice';
import { Product } from '../../demo/domain/product';
// import listingblock from '../../../assets/demo/data/listing.json';
import { BannerService } from 'src/app/services/banner.service';
import { VenueService } from 'src/app/manage/venue/service/venue.service';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { TitleCasePipe } from '@angular/common';
import { Paginator } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SubareaService } from 'src/app/services/subarea.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CityService } from 'src/app/manage/city/service/city.service';
import * as moment from 'moment';
import { SlotService } from 'src/app/services/slot.service';
import { Options } from '@angular-slider/ngx-slider';
import { VenueOrderService } from 'src/app/services/venueOrder.service';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'app-venue-category-list',
    templateUrl: './venue-category-list.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./venue-category-list.component.css', '../navigation/navigation.component.css'],
    providers: [MessageService, ConfirmationService, TitleCasePipe],
})
export class VenueCategoryListComponent {

    homeSearch: boolean = false;
    selectedCountries: any[];
    filtration: any[] | undefined;

    venueListSearch: boolean = false;
    selectedSeatingCapacityNames: any = [];
    selectedFloatingCapacityNames: any = [];
    showHomeSearch() {
        this.homeSearch = true;
    }
    showVenueListSearch() {
        this.venueListSearch = true;
    }
    visible: boolean = false;

    venueListFilter() {
        this.showVenueListFilter = true;
    }
    numberPopup: boolean = false;
    otpPopup: boolean = false;
    otpthankyouPopup: boolean;
    ingredient!: string;
    isSelected: boolean = false;
    selectedFilter: any[];
    isNavbarFixed: boolean = false;
    filteredCountries: any[];
    showVenueListFilter: boolean;
    loggedInUser: any;
    isLoggedIn: boolean = false;
    userId: any;
    occasion: City[];
    cities: City[];
    selectedCity1: City;
    selectedOccasion;
    val1: number;
    val2: number = 50;
    val3: number;
    val4: number;
    rangeValues: number[] = [0, 100];
    amenitiesArray: any[] = environment.amenitiesArray;
    venuePriceRangeValues: number[];
    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5,
            numScroll: 5,
        },
        {
            breakpoint: '768px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    public selectedCategoryId: any[];
    public urlMode;
    public finalVenueList: any[] = [];
    public listingblock;
    public loading: boolean = true;
    public bannerList: any[] = [];
    public bannerImageList: any[] = [];
    public venueList: any[] = [];
    venueid: any[] = [];
    public totalRecords: 0;
    errorMessage = '';
    venueDataById: any;
    venuearray: any[] = [];
    venueimg: any;
    public pagination = environment.pagination;
    downloadFlg: boolean = false;
    pageSize = 10;
    currentpage = 2;
    private lazyLoadEvent: LazyLoadEvent;
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 1,
        },
        {
            breakpoint: '768px',
            numVisible: 1,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        }
    ];
    displayBasic: boolean = false;
    venueImages: [];
    public otp: string;
    public activeIndex: number = 0;
    public assuredVenueList: any[] = [];
    public rangeDates: Date[] | undefined;
    public date12: Date;
    public date13: Date;
    public es: any;
    public invalidDates: Array<Date>
    public parentCategoryDetails: any[] = [];
    public parentCategoryId;
    public categoryMenuList;
    public selectedCategories: any[] = [];
    public filterCapacityArray: any[] = [];
    public filterGuestArray: any[] = [];
    public capacityId;
    public mode = 'category';
    public propertyTypeId;
    public selectedPropertyTypes: any[] = [];
    public propertyTypesList: any[] = [];
    public selectedCategoriesNames: any[] = [];
    public selectedPropertyTypeNames: any[] = [];
    public selectedFoodTypeNames: any[] = [];
    public selectedFoodTypes: any[] = [];
    public minVenuePrice;
    public maxVenuePrice;
    public venueCapacity;
    public selectedVenueCapacity;
    public selectedGuestName;
    value: number = 100;
    public capacity;
    public capacityCondition;
    public foodTypeId;
    public foodTypesList: any[] = [];
    arrayLimit = 4;
    showbottombar: boolean = false;
    public direction;
    public throttle = 300;
    public scrollDistance = 2;
    public scrollUpDistance = 2;
    public rows = 10;
    public pageNumber = 1;
    public tmpVenueList: any[] = [];
    public totalProductRecords;
    public selectedAmenities: any[] = [];
    public swimmingPoolFilter: boolean = false;
    public parkingFilter: boolean = false;
    public acFilter: boolean = false;
    public greenRoomsFilter: boolean = false;
    public powerBackupFilter: boolean = false;
    public djFilter: boolean = false;
    public entertainmentLicenseFilter: boolean = false;
    public startDate;
    public endDate;
    public filterCategoryId;
    public filteredList: any;
    public subareaList: any[] = [];
    public selectedVenueIds: any[] = [];
    public selectedSubareaIds: any[] = [];
    public cityList: any[] = [];
    public selectedCities: any[] = [];
    public venuecapacity: any;
    public filterCityIds: any;
    public filterSubareaIds;
    public selectedSubareaData: any[];
    public filterVenueIds: any[] = [];
    public selectedVenueList: any[] = [];
    public minDateValue: Date;
    public filterList: any[] = [];
    public selectedSort;
    public allFoodMenuPriceArray: any[] = [];
    public filterOccasion;
    public slotList: any[] = [];
    public selectedSlot;
    public selectedSlotId;
    public guestCount;
    public orderType;
    priceSliderValue: number = 100;
    public selectedCompareVenues: any[] = [];
    // minValue: number = 0;
    // maxValue: number = 1000000;
    // priceSliderOptions: Options = {
    //     floor: 0,
    //     ceil: 1000000
    // };
    // @ViewChild('capacity') capacity: ElementRef;
    @ViewChild('ngxotp') ngxotp: NgxOtpInputComponent;
    public config: NgxOtpInputConfig = {
        otpLength: 4,
        autofocus: true,
        classList: {
            inputBox: 'my-super-box-class',
            input: 'my-super-class',
            inputFilled: 'my-super-filled-class',
            inputDisabled: 'my-super-disable-class',
            inputSuccess: 'my-super-success-class',
            inputError: 'my-super-error-class',
        },
    };
    @ViewChild('minVenuePriceInput') minVenuePriceInput: ElementRef;
    @ViewChild('maxVenuePriceInput') maxVenuePriceInput: ElementRef;
    @ViewChild('searchCalendar', { static: true }) datePicker;
    seatingCapacityId: any;
    seatingCapacity: any;
    seatingCapacityCondition: any;
    constructor(
        private productService: ProductService,
        private BannerService: BannerService,
        private venueService: VenueService,
        private router: Router,
        private categoryService: CategoryService,
        private el: ElementRef,
        private activeRoute: ActivatedRoute,
        private subareaService: SubareaService,
        private tokenStorageService: TokenStorageService,
        private cityService: CityService,
        private renderer: Renderer2,
        private slotService: SlotService,
        private venueOrderService: VenueOrderService,
        private messageService: MessageService,
        private titlecasePipe: TitleCasePipe,
        private confirmationService: ConfirmationService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
    }
    async ngOnInit() {
        this.urlMode = "venue_list";
        this.minDateValue = new Date();
        this.renderer.addClass(document.body, 'body-dark');
        this.pageNumber = 1;
        this.loggedInUser = this.tokenStorageService.getUser();
        let getToken = this.tokenStorageService.getToken();
        if (getToken != null) {
            this.isLoggedIn = true;
        }
        if (this.loggedInUser != undefined) {
            this.isLoggedIn = true;
            this.userId = this.loggedInUser.id;
        }

        if (this.isLoggedIn == false) {
            this.router.navigate(['/']);
        }
        this.filterGuestArray = [
            {
                'id': 1, 'label': "50", condition: 'lte', value: 50, status: false
            },
            {
                'id': 2, 'label': "100", condition: 'lte', value: 100, status: false
            },
            {
                'id': 3, 'label': "200", condition: 'lte', value: 200, status: false
            },
            {
                'id': 4, 'label': "500", condition: 'lte', value: 500, status: false
            },
            {
                'id': 5, 'label': "1000", condition: 'lte', value: 1000, status: false
            },
            {
                'id': 6, 'label': "1500", condition: 'lte', value: 1500, status: false
            },
            {
                'id': 7, 'label': "2000", condition: 'lte', value: 2000, status: false
            },
        ];
        this.filterCapacityArray = [
            {
                'id': 1, 'label': "Upto 50", condition: 'lte', value: 50, status: false
            },
            {
                'id': 2, 'label': "Upto 100", condition: 'lte', value: 100, status: false
            },
            {
                'id': 3, 'label': "Upto 200", condition: 'lte', value: 200, status: false
            },
            {
                'id': 4, 'label': "Upto 500", condition: 'lte', value: 500, status: false
            },
            {
                'id': 5, 'label': "Upto 1000", condition: 'lte', value: 1000, status: false
            },
            {
                'id': 6, 'label': "Upto 1500", condition: 'lte', value: 1500, status: false
            },
            {
                'id': 7, 'label': "Upto 2000", condition: 'lte', value: 2000, status: false
            },
        ];
        // this.occasion = [
        //     { name: 'Wedding', code: 'AN' },
        //     { name: 'Reception', code: 'MH' },
        //     { name: 'Ring Ceremony', code: 'CR' },
        //     { name: 'Anniversary', code: 'CT' },
        //     { name: 'Birthday Party', code: 'CT' },
        //     { name: 'Baby Shower', code: 'BD' },
        //     { name: 'Pool Party', code: 'BV' },
        //     { name: 'Corporate Events', code: 'Di' },
        //     { name: 'Corporate Events', code: 'GG' },
        //     { name: 'Couple Dates', code: 'GR' },
        //     { name: 'Get Together', code: 'JS' },
        // ];
        this.filterList = [
            { name: 'Price (low to high)', value: 'price_low_high' },
            { name: 'Price (high to low)', value: 'price_high_low' },
            { name: 'Ratings', value: 'ratings' },
            { name: 'Popularity', value: 'popularity' },
            { name: 'Distance', covaluede: 'distance' }
        ];

        this.activeRoute.queryParams.subscribe(params => {
            this.startDate = params['startDate'];
            this.endDate = params['endDate'];
            this.guestCount = params['capacity'];
            if (params['venue'] !== undefined) {
                if (params['venue'].length > 0) {
                    //console.log('in venue');
                    this.filterVenueIds = JSON.parse(params['venue']);
                    this.selectedVenueIds = JSON.parse(params['venue']);
                } else {
                    this.filterVenueIds = params['venue'];
                    this.selectedVenueIds = [params['venue']];
                }
            }
            if (params['city'] != undefined) {
                //console.log('in city');
                if (params['city'].length > 0) {
                    this.filterCityIds = JSON.parse(params['city']);
                    this.selectedCities = JSON.parse(params['city']);
                } else {
                    this.filterCityIds = [params['city']];
                    this.selectedCities = [params['city']];
                }
            }
            if (params['area'] != undefined) {
                //console.log('in area');
                if (params['area'].length > 0) {
                    this.filterSubareaIds = JSON.parse(params['area']);
                    this.selectedSubareaIds = JSON.parse(params['area']);
                } else {
                    this.filterSubareaIds = [params['area']];
                    this.selectedSubareaIds = [params['area']];
                }
            }
            this.filterCategoryId = params['occasion'];
            if (this.guestCount != null) {
                // this.venuecapacity = this.capacity;
                // this.capacityCondition = "lte";
                // if (this.capacity > 500) {
                //     this.capacityCondition = "lte";
                // }
                // this.guestCount
            }
            if (this.startDate !== undefined && this.endDate !== undefined) {
                this.rangeDates = [new Date(this.startDate)];
                this.rangeDates.push(new Date(this.endDate));
            }
        });
        this.getSlots();
        this.getCategoryBySlug();
        await this.getSubareas();
        await this.getCities();
    }
    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'body-dark');
    }
    @HostListener('window:scroll', ['$event']) onScroll() {
        if (window.scrollY > 100) {
            this.isNavbarFixed = true;
        } else {
            this.isNavbarFixed = false;
        }
    }
    showDialog() {
        this.visible = true;
    }
    getCategoryBySlug() {
        let query = "?filterByDisable=false&filterByStatus=true";
        this.categoryService.getCategoryWithoutAuthList(query).subscribe(
            data => {
                if (data.data.items.length > 0) {
                    this.parentCategoryDetails = data.data.items;
                    this.parentCategoryDetails.forEach(element => {
                        if (element.slug == "parent_category") {
                            this.parentCategoryId = element['id'];
                            this.getCategoryList();
                        }
                        if (element.slug == "property_type") {
                            this.propertyTypeId = element['id'];
                            this.getPropertyTypes();
                        }
                        if (element.slug == "food") {
                            this.foodTypeId = element['id'];
                            this.getFoodTypes();
                        }
                    })
                }
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    getCategoryList() {
        let query = "?filterByDisable=false&filterByStatus=true&filterByParent=" + this.parentCategoryId + "&sortBy=created_at&orderBy=1";
        this.categoryService.getCategoryWithoutAuthList(query).subscribe(
            data => {
                //if (data.data.items.length > 0) {
                this.categoryMenuList = data.data.items;
                let count = 0;
                this.categoryMenuList.forEach(element => {
                    element['selected'] = false;
                    if (this.filterCategoryId == element.id) {
                        //this.selectedOccasion.push(element);
                        this.selectedOccasion = element;
                        element['selected'] = true;
                        this.selectedCategories.push(element.id);
                        this.selectedCategoriesNames.push({ 'id': element.id, 'name': element.name, selected: true });
                    }
                    count++;
                });
                let mode = "category";
                this.getVenueList(this.lazyLoadEvent, mode);
                //}
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    getFoodTypes() {
        let query = "?filterByDisable=false&filterByStatus=true&filterByParent=" + this.foodTypeId + "&sortBy=created_at&orderBy=1";
        this.categoryService.getCategoryWithoutAuthList(query).subscribe(
            data => {
                //if (data.data.items.length > 0) {
                this.foodTypesList = data.data.items;
                let count = 0;
                this.foodTypesList.forEach(element => {
                    element['selected'] = false;
                    count++;
                });
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    getPropertyTypes() {
        let query = "?filterByDisable=false&filterByStatus=true&filterByParent=" + this.propertyTypeId + "&sortBy=created_at&orderBy=1";
        this.categoryService.getCategoryWithoutAuthList(query).subscribe(
            data => {
                //if (data.data.items.length > 0) {
                this.propertyTypesList = data.data.items;
                let count = 0;
                this.propertyTypesList.forEach(element => {
                    element['selected'] = false;
                    count++;
                });
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    getSlots() {
        let query = "?filterByDisable=false&filterByStatus=true";
        this.slotService.getSlotListWithoutAuth(query).subscribe(
            data => {
                if (data.data.items.length > 0) {
                    this.slotList = data.data.items;
                }
            },
            error => {

            }
        );
    }
    async getSubareas() {
        let query = "?filterByDisable=false&filterByStatus=true";
        this.subareaService.getSubareaList(query).subscribe(
            data => {
                this.subareaList = data.data.items;
                this.selectedSubareaData = [];
                this.subareaList.forEach(element => {
                    if (this.filterSubareaIds != undefined) {
                        if (this.filterSubareaIds.length > 0) {
                            this.filterSubareaIds.forEach(sElement => {
                                if (sElement === element.id) {
                                    this.selectedSubareaData.push(element);
                                    if (this.selectedFilter === undefined) {
                                        this.selectedFilter = [element];
                                    } else {
                                        this.selectedFilter.push(element);
                                    }
                                }
                            });
                        }
                    }
                });
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    async getCities() {
        let query = "?filterByDisable=false&filterByStatus=true";
        this.cityService.getcityList(query).subscribe(
            data => {
                this.cityList = data.data.items;
                if (this.cityList.length > 0) {
                    this.selectedFilter = [];
                    this.cityList.forEach(element => {
                        if (this.filterCityIds !== undefined) {
                            if (this.filterCityIds.length > 0) {
                                this.filterCityIds.forEach(cElement => {
                                    element.mode = 'city';
                                    if (cElement === element.id) {
                                        if (this.selectedFilter == undefined) {
                                            this.selectedFilter = [element];
                                        } else {
                                            this.selectedFilter.push(element);
                                        }
                                    }
                                });
                            }
                        }
                    })
                    this.selectedSubareaData.forEach(sElement => {
                        sElement.mode = 'subarea';
                        this.selectedFilter.push(sElement);
                    });
                    if (this.selectedVenueList.length > 0) {
                        this.selectedVenueList.forEach(vElement => {
                            vElement.mode = 'venue';
                            this.selectedFilter.push(vElement);
                        });
                    }
                }
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    filterCategory(event) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.categoryMenuList.length; i++) {
            let category = this.categoryMenuList[i];
            if (category.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {

                filtered.push(category);
            }
        }
        this.filterOccasion = filtered;
    }
    search(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.cityList.length; i++) {
            let city = this.cityList[i];
            if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                city.mode = "city";
                filtered.push(city);
            }
        }
        for (let i = 0; i < this.subareaList.length; i++) {
            let subarea = this.subareaList[i];
            if (subarea.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                subarea.mode = "subarea";
                filtered.push(subarea);
            }
        }
        for (let i = 0; i < this.finalVenueList.length; i++) {
            let venue = this.finalVenueList[i];
            if (venue.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                venue.mode = "venue";
                filtered.push(venue);
            }
        }
        this.filteredList = filtered;
    }
    onSlotClick(slot) {
        this.selectedSlot = slot;
        this.selectedSlotId = slot.id;
        this.finalVenueList = [];
        this.pageNumber = 1;
        //this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickCalendarClose() {
        this.datePicker.overlayVisible = false;
    }
    onClickFilter(filter) {
        if (this.selectedSort != null) {
            if (this.selectedSort.value === 'price_low_high') {
                this.finalVenueList.sort((a, b) => Number(a['minVenuePrice']) - Number(b['minVenuePrice']));
            }

            if (this.selectedSort.value === 'price_high_low') {
                let test = this.finalVenueList.sort((a, b) => Number(b['minVenuePrice']) - Number(a['minVenuePrice']));
            }
            if (this.selectedSort.value === 'ratings') {
                this.finalVenueList.sort((a, b) => Number(b['eazyVenueRating']) - Number(a['eazyVenueRating']));
            }
            if (this.selectedSort.value === 'popularity') {
                this.finalVenueList.sort((a, b) => Number(b['views']) - Number(a['views']));
            }
        } else {
            this.finalVenueList.sort((a, b) => Number(a['capacity']) - Number(b['capacity']));
        }
        // this.changeDetectorRef.detectChanges();

        // this.finalVenueList = [];
        // this.pageNumber = 1;
        // this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onSelectSearch(event) {
        if (event.mode == 'venue') {
            this.selectedVenueIds.push(event.id);
        }
        if (event.mode == 'subarea') {
            this.selectedSubareaIds.push(event.id);
        }
        if (event.mode == 'city') {
            this.selectedCities.push(event.id);
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickClear() {
        this.rangeDates = null;
        this.startDate = undefined;
        this.endDate = undefined;
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onSelectDate(event) {
        this.startDate = this.rangeDates[0];
        this.endDate = this.rangeDates[1];
        if (this.endDate === null) {
            this.endDate = moment(this.startDate).format("YYYY-MM-DD");
        } else {
            this.datePicker.overlayVisible = false;
            this.endDate = moment(this.rangeDates[1]).format("YYYY-MM-DD");
        }
        this.startDate = moment(this.rangeDates[0]).format("YYYY-MM-DD");
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickSearch() {
        let selectedCities = JSON.stringify(this.selectedCities);
        let selectedSubareaIds = JSON.stringify(this.selectedSubareaIds);
        let selectedVenueIds = JSON.stringify(this.selectedVenueIds);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(
            ['/venue-list'],
            {
                queryParams: {
                    startDate: this.startDate, endDate: this.endDate, capacity: this.capacity, occasion: this.selectedCategories, city: selectedCities,
                    area: selectedSubareaIds, venue: selectedVenueIds
                }
            }
        );
    }

    onClearResetAllData(event) {
        if (event.mode === 'venue') {
            let index = this.findVenueIndexById(event.id, this.selectedVenueIds);
            let venueIndex = this.findIndexById(event.id, this.selectedVenueList);
            let filterVenueIndex = this.findVenueIndexById(event.id, this.filterVenueIds);
            if (index !== -1) {
                if (this.selectedVenueIds.length > 0) {
                    this.selectedVenueIds.splice(index, 1);
                }
            }
            if (venueIndex !== -1) {
                this.selectedVenueList.splice(venueIndex, 1);
            }
            if (filterVenueIndex !== -1) {
                this.filterVenueIds.splice(filterVenueIndex, 1);
            }
        } else if (event.mode === 'subarea') {
            let index = this.findVenueIndexById(event.id, this.selectedSubareaIds);
            let filterSubareaIdsIndex = this.findVenueIndexById(event.id, this.filterSubareaIds);
            let selectedSubareaIndex = this.findIndexById(event.id, this.selectedSubareaData);
            if (index !== -1) {
                this.selectedSubareaIds.splice(index, 1);
            }
            if (filterSubareaIdsIndex !== -1) {
                this.filterSubareaIds.splice(filterSubareaIdsIndex, 1);
            }
            if (selectedSubareaIndex !== -1) {
                this.selectedSubareaData.splice(selectedSubareaIndex, 1);
            }
        } else if (event.mode === 'city') {
            let index = this.findVenueIndexById(event.id, this.selectedCities);
            let filterCityIndex = this.findVenueIndexById(event.id, this.filterCityIds);
            if (index !== -1) {
                this.selectedCities.splice(index, 1);
            }
            if (filterCityIndex !== -1) {
                this.selectedCities.splice(filterCityIndex, 1);
            }
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.mode = "category";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    findVenueIndexById(id, arrayName) {
        let index = -1;
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i] === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    onClickCategory(category) {
        if (category !== null) {
            this.selectedOccasion = category;
            if (category.selected == true) {
                this.selectedCategories = [];
                this.selectedCategoriesNames = [];
                let index = this.findIndexById(category.id, this.categoryMenuList);
                if (index != -1) {
                    this.categoryMenuList[index].selected = false;
                    // let selectedIndex = this.findSelectedIndexById(category.id, this.selectedCategories);
                    // if (selectedIndex != -1) {
                    //     this.selectedCategories.splice(selectedIndex, 1);
                    // }
                    // let selectedNameIndex = this.findIndexById(category.id, this.selectedCategoriesNames);
                    // if (selectedNameIndex != -1) {
                    //     this.selectedCategoriesNames.splice(selectedNameIndex, 1);
                    // }
                }
            } else {
                let index = this.findIndexById(category.id, this.categoryMenuList);
                if (index != -1) {
                    this.categoryMenuList[index].selected = true;
                    //let selectedIndex = this.findSelectedIndexById(category.id, this.selectedCategories);
                    this.selectedCategories = category.id;
                    this.selectedCategoriesNames = [{ 'id': category.id, 'name': category.name, selected: true }];
                }
            }
        } else {
            this.selectedOccasion = undefined;
            this.selectedCategories = [];
            this.selectedCategoriesNames = [];
        }
        if (this.selectedCategories == undefined) {
            this.selectedCategories = [];
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.mode = "category";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickFoodType(foodType) {
        if (foodType.selected == true) {
            let index = this.findIndexById(foodType.id, this.foodTypesList);
            if (index != -1) {
                this.foodTypesList[index].selected = false;
                let selectedIndex = this.findSelectedIndexById(foodType.id, this.selectedFoodTypes);
                let selectedNameIndex = this.findIndexById(foodType.id, this.selectedFoodTypeNames);
                if (selectedIndex != -1) {
                    this.selectedFoodTypes.splice(selectedIndex, 1);
                }
                if (selectedNameIndex != -1) {
                    this.selectedFoodTypeNames.splice(selectedNameIndex, 1);
                }
            }
        } else {
            let index = this.findIndexById(foodType.id, this.foodTypesList);
            if (index != -1) {
                this.foodTypesList[index].selected = true;
                this.selectedFoodTypes.push(foodType.id);
                this.selectedFoodTypeNames.push({ 'id': foodType.id, 'name': foodType.name, selected: true });
            }
        }
        this.pageNumber = 1;
        this.finalVenueList = [];
        this.mode = "food";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickPropertyType(propertyType) {
        if (propertyType.selected == true) {
            let index = this.findIndexById(propertyType.id, this.propertyTypesList);
            if (index != -1) {
                this.propertyTypesList[index].selected = false;
                let selectedIndex = this.findSelectedIndexById(propertyType.id, this.selectedPropertyTypes);
                let selectedNameIndex = this.findIndexById(propertyType.id, this.selectedPropertyTypeNames);
                this.selectedPropertyTypes.splice(selectedIndex, 1);
                this.selectedPropertyTypeNames.splice(selectedNameIndex, 1);
            }
        } else {
            let index = this.findIndexById(propertyType.id, this.propertyTypesList);
            if (index != -1) {
                this.propertyTypesList[index].selected = true;
                //let selectedIndex = this.findSelectedIndexById(propertyType.id, this.selectedPropertyTypes);
                this.selectedPropertyTypes.push(propertyType.id);
                this.selectedPropertyTypeNames.push({ 'id': propertyType.id, 'name': propertyType.name, selected: true });
            }
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.mode = "propertyType";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    findSelectedIndexById(id, arrayName) {
        let index = -1;
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i] === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    onClickSeatingCapacity(capacity, event) {
        if (event.checked) {
            if (capacity.id != undefined) {
                this.seatingCapacityId = capacity.id;
                this.seatingCapacity = capacity.value;
                this.seatingCapacityCondition = capacity.condition;
                this.filterCapacityArray.forEach(element => {
                    let reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: element.status };
                    element.status = false;
                    if (this.seatingCapacityId == element.id) {
                        const index = this.findIndexById(element.id, this.filterCapacityArray);
                        reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: true };
                        this.filterCapacityArray[index] = reportObj;
                        this.selectedSeatingCapacityNames = [{ 'id': element.id, 'name': element.label, selected: true }];
                    }
                })
            } else {
                this.seatingCapacity = capacity;
                this.seatingCapacityCondition = '';
                if (capacity > 1000) {
                    this.capacityCondition = "lte";
                } else {
                    this.capacityCondition = "lte";
                }
            }
        } else {
            this.filterCapacityArray.forEach(element => {
                let reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: element.status };
                element.status = false;
                if (this.seatingCapacityId == element.id) {
                    const index = this.findIndexById(element.id, this.filterCapacityArray);
                    reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: false };
                    this.filterCapacityArray[index] = reportObj;
                    let selectedNameIndex = this.findIndexById(element.id, this.selectedSeatingCapacityNames);

                    this.selectedSeatingCapacityNames.splice(selectedNameIndex, 1);
                }
            })
            this.seatingCapacity = capacity;
            this.seatingCapacityCondition = '';
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.mode = "seating_capacity";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickGuestCount(capacity, event) {
        if (event.checked) {
            if (capacity.id != undefined) {
                this.capacityId = capacity.id;
                this.capacity = capacity.value;
                // if (typeof this.capacity != 'number') {
                //     console.log(typeof this.capacity);
                //     return;
                // }
                this.capacityCondition = capacity.condition;
                this.filterGuestArray.forEach(element => {
                    let reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: element.status };
                    element.status = false;
                    if (this.capacityId == element.id) {
                        const index = this.findIndexById(element.id, this.filterGuestArray);
                        reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: true };
                        this.filterGuestArray[index] = reportObj;
                        this.selectedFloatingCapacityNames = [{ 'id': element.id, 'name': element.label, selected: true }];
                    }
                })
            } else {
                this.capacity = capacity.value;
                this.capacityCondition = '';
                if (capacity > 500) {
                    this.capacityCondition = "lte";
                } else {
                    this.capacityCondition = "lte";
                }
            }
        } else {
            if (capacity.value) {
                this.capacity = capacity.value;
            } else {
                this.capacity = capacity;
            }

            this.capacityCondition = '';
            // if (typeof this.capacity != 'number') {
            //     console.log(typeof this.capacity);
            //     return;
            // }
            this.filterGuestArray.forEach(element => {
                let reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: element.status };
                element.status = false;
                if (this.seatingCapacityId == element.id) {
                    const index = this.findIndexById(element.id, this.filterGuestArray);
                    reportObj = { id: element.id, label: element.label, condition: element.condition, value: element.value, status: false };
                    this.filterGuestArray[index] = reportObj;
                    let selectedNameIndex = this.findIndexById(element.id, this.selectedFloatingCapacityNames);
                    this.selectedFloatingCapacityNames.splice(selectedNameIndex, 1);
                }
            });
            if (capacity > 500) {
                this.capacityCondition = "lte";
            } else {
                this.capacityCondition = "lte";
            }

        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.mode = "guest";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickTopGuestCount(guestCount, event) {
        if (guestCount.value) {
            this.guestCount = guestCount.value;
            this.capacity = guestCount.value;
        } else {
            this.guestCount = guestCount;
            this.capacity = guestCount;
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickSendEnquiries(venue, mode) {
        if (this.selectedOccasion == undefined) {
            this.messageService.add({ key: 'toastMsg', severity: 'error', summary: 'error', detail: 'Please select occasion.', life: 6000 });
            return;
        }
        this.confirmationService.confirm({
            message: 'Are you sure you want to send enquiry for ' + (this.titlecasePipe.transform(venue.name)) + ' venue?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let durationData = [{
                    occasionStartDate: this.rangeDates[0],
                    occasionEndDate: this.rangeDates[1],
                    slotId: this.slotList[0].id
                }];
                this.orderType = mode;
                let venueOrderData = {
                    categoryId: this.selectedOccasion.id,
                    occasionDate: this.rangeDates[0],
                    durationData: durationData,
                    guestcnt: this.guestCount,
                    decor: 0,
                    foodType: [{ slug: venue.minFoodType.foodType }],
                    vendors: [],
                    customerId: this.userId,
                    venueId: venue.id,
                    price: venue.minVenuePrice,
                    foodMenuType: [venue.minFoodType],
                    orderType: this.orderType,
                    bookingPrice: venue.minVenuePrice
                };

                this.venueOrderService.addVenueOrder(venueOrderData).subscribe(
                    data => {

                        if (mode == 'send_enquires') {
                            this.messageService.add({ key: 'toastMsg', severity: 'success', summary: 'Successful', detail: 'Enquires send to eazyvenue.', life: 6000 });
                        } else {
                            this.messageService.add({ key: 'toastMsg', severity: 'success', summary: 'Successful', detail: 'Venue order booked.', life: 6000 });
                        }

                        setTimeout(() => {
                            //let currentUrl = '/venue/' + this.id;
                            let currentUrl = '/my-profile?mode='+ mode;
                            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                            this.router.onSameUrlNavigation = 'reload';
                            this.router.navigate([currentUrl]);
                        }, 2000);
                    },
                    ((err) => {
                        this.messageService.add({ key: 'toastMsg', severity: 'error', summary: err.error.message, detail: 'Venue order booked failed', life: 6000 });
                    })
                );
            },
            reject: () => {

            }
        });

    }
    onSelectAmenities(amenity, event) {
        if (event.checked.length > 0) {
            if (amenity.slug == "swimming_pool") {
                this.swimmingPoolFilter = true;
            }
            if (amenity.slug == "parking") {
                this.parkingFilter = true;
            }
            if (amenity.slug == "ac") {
                this.acFilter = true;
            }
            if (amenity.slug == "green_rooms") {
                this.greenRoomsFilter = true;
            }
            if (amenity.slug == "power_backup") {
                this.powerBackupFilter = true;
            }
            if (amenity.slug == "dj") {
                this.djFilter = true;
            }
            if (amenity.slug == "entertainment_license") {
                this.entertainmentLicenseFilter = true;
            }
        } else {
            if (amenity.slug == "swimming_pool") {
                this.swimmingPoolFilter = false;
            }
            if (amenity.slug == "parking") {
                this.parkingFilter = false;
            }
            if (amenity.slug == "ac") {
                this.acFilter = false;
            }
            if (amenity.slug == "green_rooms") {
                this.greenRoomsFilter = false;
            }
            if (amenity.slug == "power_backup") {
                this.powerBackupFilter = false;
            }
            if (amenity.slug == "dj") {
                this.djFilter = false;
            }
            if (amenity.slug == "entertainment_license") {
                this.entertainmentLicenseFilter = false;
            }
        }
        this.finalVenueList = [];
        this.pageNumber = 1;
        this.mode = "guest";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    findIndexById(id, arrayName) {
        let index = -1;
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    onVenuePriceChange() {
        this.minVenuePrice = this.minVenuePriceInput.nativeElement.value;
        this.maxVenuePrice = this.maxVenuePriceInput.nativeElement.value;
        this.mode = "venuePrice";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    onClickClearAll() {
        this.selectedSeatingCapacityNames = [];
        this.selectedFloatingCapacityNames = [];
        this.selectedPropertyTypes = [];
        this.minVenuePrice = [];
        this.maxVenuePrice = [];
        this.capacityCondition = undefined;
        this.capacity = undefined;
        this.seatingCapacityCondition = undefined;
        this.selectedFoodTypes = [];
        this.selectedCategories = [];
        this.swimmingPoolFilter = false;
        this.parkingFilter = false;
        this.acFilter = false;
        this.greenRoomsFilter = false;
        this.djFilter = false;
        this.entertainmentLicenseFilter = false;
        // this.selectedVenueIds = [];
        // this.selectedSubareaIds = [];
        // this.selectedSlotId = undefined;
        // this.startDate = undefined;
        // this.endDate = undefined;
        // this.selectedCategoriesNames = [];
        // this.selectedFilter = [];
        // this.rangeDates = null;
        // this.selectedOccasion = undefined;
        this.selectedPropertyTypeNames = [];
        this.selectedFoodTypeNames = [];
        this.selectedCities = [];
        this.finalVenueList = [];
        this.categoryMenuList.forEach(element => {
            element['selected'] = false;
        });
        this.propertyTypesList.forEach(element => {
            element['selected'] = false;
        });
        this.foodTypesList.forEach(element => {
            element['selected'] = false;
        });
        this.filterCapacityArray.forEach(element => {
            element['status'] = false;
        });
        this.filterGuestArray.forEach(element => {
            element['status'] = false;
        });
        this.pageNumber = 1;
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    getVenueList(event: LazyLoadEvent, mode) {
        let params = "";
        let rows = 10;
        let query = "filterByDisable=false&filterByStatus=true";
        if (mode == 'category') {
            if (this.selectedCategories.length > 0) {
                query += "&filterByCategory=" + this.selectedCategories;
            }
            if (this.selectedPropertyTypes.length > 0) {
                query += "&filterByPropertyType=" + this.selectedPropertyTypes;
            }
            if (this.minVenuePrice > 0 && this.maxVenuePrice > 0) {
                query += "&filterByMinVenuePrice=" + this.minVenuePrice + "&filterByMaxVenuePrice=" + this.maxVenuePrice;
            }

            if (this.capacityCondition != undefined && this.capacity != undefined && this.capacityCondition != '' && this.capacity != '') {
                query += "&filterByGuestCondition=" + this.capacityCondition + "&filterByGuestCapacity=" + this.capacity;
            }
            if (this.selectedFoodTypes.length > 0) {
                query += "&filterByFoodType=" + this.selectedFoodTypes;
            }
            if (this.seatingCapacityCondition != undefined && this.seatingCapacity != undefined && this.seatingCapacityCondition != '' && this.seatingCapacity != '') {
                query += "&filterByGuestCondition=" + this.seatingCapacityCondition + "&filterByGuestCapacity=" + this.seatingCapacity;
            }
        }
        if (mode == 'propertyType') {
            query += "&filterByPropertyType=" + this.selectedPropertyTypes;
            if (this.selectedCategories.length > 0) {
                query += "&filterByCategory=" + this.selectedCategories;
            }
            if (this.minVenuePrice > 0 && this.maxVenuePrice > 0) {
                query += "&filterByMinVenuePrice=" + this.minVenuePrice + "&filterByMaxVenuePrice=" + this.maxVenuePrice;
            }
            if (this.capacityCondition != undefined && this.capacity != undefined && this.capacityCondition != '' && this.capacity != '') {
                query += "&filterByGuestCondition=" + this.capacityCondition + "&filterByGuestCapacity=" + this.capacity;
            }
            if (this.selectedFoodTypes.length > 0) {
                query += "&filterByFoodType=" + this.selectedFoodTypes;
            }
            if (this.seatingCapacityCondition != undefined && this.seatingCapacity != undefined && this.seatingCapacityCondition != '' && this.seatingCapacity != '') {
                query += "&filterByGuestCondition=" + this.seatingCapacityCondition + "&filterByGuestCapacity=" + this.seatingCapacity;
            }
        }
        if (mode == 'food') {
            query += "&filterByFoodType=" + this.selectedFoodTypes;
            if (this.selectedCategories.length > 0) {
                query += "&filterByCategory=" + this.selectedCategories;
            }
            if (this.minVenuePrice > 0 && this.maxVenuePrice > 0) {
                query += "&filterByMinVenuePrice=" + this.minVenuePrice + "&filterByMaxVenuePrice=" + this.maxVenuePrice;
            }
            if (this.capacityCondition != undefined && this.capacity != undefined && this.capacityCondition != '' && this.capacity != '') {
                query += "&filterByGuestCondition=" + this.capacityCondition + "&filterByGuestCapacity=" + this.capacity;
            }
            if (this.selectedPropertyTypes.length > 0) {
                query += "&filterByPropertyType=" + this.selectedPropertyTypes;
            }
            if (this.seatingCapacityCondition != undefined && this.seatingCapacity != undefined && this.seatingCapacityCondition != '' && this.seatingCapacity != '') {
                query += "&filterByGuestCondition=" + this.seatingCapacityCondition + "&filterByGuestCapacity=" + this.seatingCapacity;
            }
        }
        if (mode == 'venuePrice') {
            query += "&filterByMinVenuePrice=" + this.minVenuePrice + "&filterByMaxVenuePrice=" + this.maxVenuePrice;
            if (this.selectedCategories.length > 0) {
                query += "&filterByCategory=" + this.selectedCategories;
            }
            if (this.selectedPropertyTypes.length > 0) {
                query += "&filterByPropertyType=" + this.selectedPropertyTypes;
            }
            if (this.capacityCondition != undefined && this.capacity != undefined && this.capacityCondition != '' && this.capacity != '') {
                query += "&filterByGuestCondition=" + this.capacityCondition + "&filterByGuestCapacity=" + this.capacity;
            }
            if (this.selectedFoodTypes.length > 0) {
                query += "&filterByFoodType=" + this.selectedFoodTypes;
            }
            if (this.seatingCapacityCondition != undefined && this.seatingCapacity != undefined && this.seatingCapacityCondition != '' && this.seatingCapacity != '') {
                query += "&filterByGuestCondition=" + this.seatingCapacityCondition + "&filterByGuestCapacity=" + this.seatingCapacity;
            }
        }
        if (mode == 'guest') {
            query += "&filterByGuestCondition=" + this.capacityCondition + "&filterByGuestCapacity=" + this.capacity;
            if (this.selectedCategories.length > 0) {
                query += "&filterByCategory=" + this.selectedCategories;
            }
            if (this.selectedPropertyTypes.length > 0) {
                query += "&filterByPropertyType=" + this.selectedPropertyTypes;
            }
            if (this.minVenuePrice > 0 && this.maxVenuePrice > 0) {
                query += "&filterByMinVenuePrice=" + this.minVenuePrice + "&filterByMaxVenuePrice=" + this.maxVenuePrice;
            }
            if (this.selectedFoodTypes.length > 0) {
                query += "&filterByFoodType=" + this.selectedFoodTypes;
            }
            if (this.seatingCapacityCondition != undefined && this.seatingCapacity != undefined && this.seatingCapacityCondition != '' && this.seatingCapacity != '') {
                query += "&filterByGuestCondition=" + this.seatingCapacityCondition + "&filterByGuestCapacity=" + this.seatingCapacity;
            }
        }
        if (mode == 'seating_capacity') {
            query += "&filterBySeatingCapacityCondition=" + this.seatingCapacityCondition + "&filterBySeatingCapacity=" + this.seatingCapacity;
            if (this.selectedCategories.length > 0) {
                query += "&filterByCategory=" + this.selectedCategories;
            }
            if (this.selectedPropertyTypes.length > 0) {
                query += "&filterByPropertyType=" + this.selectedPropertyTypes;
            }
            if (this.minVenuePrice > 0 && this.maxVenuePrice > 0) {
                query += "&filterByMinVenuePrice=" + this.minVenuePrice + "&filterByMaxVenuePrice=" + this.maxVenuePrice;
            }
            if (this.selectedFoodTypes.length > 0) {
                query += "&filterByFoodType=" + this.selectedFoodTypes;
            }
            if (this.capacityCondition != undefined && this.capacity != undefined && this.capacityCondition != '' && this.capacity != '') {
                query += "&filterByGuestCondition=" + this.capacityCondition + "&filterByGuestCapacity=" + this.capacity;
            }
        }
        // if (this.selectedSort != undefined) {
        //     if (this.selectedSort.value == "price_low_high") {
        //         query += "&sortBy=venuePrice&orderBy=1";
        //     }
        //     if (this.selectedSort.value == "price_high_low") {
        //         query += "&sortBy=venuePrice&orderBy=1";
        //     }
        //     if (this.selectedSort.value == "ratings") {
        //         query += "&sortBy=eazyVenueRating&orderBy=1";
        //     }
        //     if (this.selectedSort.value == "popularity") {
        //         query += "&sortBy=views&orderBy=1";
        //     }
        //     if (this.selectedSort.value == "distance") {

        //     }

        // }
        if (this.swimmingPoolFilter == true) {
            query += "&filterBySwimmingPool=" + this.swimmingPoolFilter;
        }
        if (this.parkingFilter == true) {
            query += "&filterByParking=" + this.parkingFilter;
        }
        if (this.acFilter == true) {
            query += "&filterByAc=" + this.acFilter;
        }
        if (this.greenRoomsFilter == true) {
            query += "&filterByGreenRooms=" + this.greenRoomsFilter;
        }
        if (this.powerBackupFilter == true) {
            query += "&filterByPowerBackup=" + this.powerBackupFilter;
        }
        if (this.djFilter == true) {
            query += "&filterByDj=" + this.djFilter;
        }
        if (this.entertainmentLicenseFilter == true) {
            query += "&filterByEntertainmentLicense=" + this.entertainmentLicenseFilter;
        }
        if (this.selectedVenueIds.length > 0) {
            query += "&filterByVenueIds=" + this.selectedVenueIds;
        }
        if (this.selectedSubareaIds.length > 0) {
            query += "&filterBySubareaIds=" + this.selectedSubareaIds;
        }
        if (this.selectedCities.length > 0) {
            query += "&filterByCities=" + this.selectedCities;
        }
        if (this.selectedSlotId != undefined) {
            query += "&filterBySlotId=" + this.selectedSlotId;
        }
        if (this.startDate != undefined && this.endDate != undefined) {
            query += "&filterByStartDate=" + this.startDate + "&filterByEndDate=" + this.endDate;
        }
        if (event !== undefined) {
            if (event.first != undefined && event.first == 0) {
                this.pageNumber = event.first + 1;
            } else if (event.first != undefined && event.first > 0) {
                this.pageNumber = (event.first / event.rows) + 1;
            } else {
                this.pageNumber = 1;
            }
            if (event.rows != undefined) {
                rows = event.rows;
            } else {
                rows = 10;
            }
        }
        query += "&pageSize=" + rows + "&pageNumber=" + this.pageNumber + params;
        this.venueList = [];
        this.venueList = Object.assign([], this.finalVenueList);
        this.venueService.getVenueListWithoutAuth(query).subscribe(
            async data => {
                //if (data.data.items.length > 0) {
                this.tmpVenueList = data.data.items;
                this.tmpVenueList.forEach(element => {
                    if (element.venueVideo !== '') {
                        element.venueImage.push({ video: element.venueVideo });
                    }
                })
                this.finalVenueList = [...this.venueList, ...this.tmpVenueList];
                this.selectedVenueList = [];
                let minVenuePriceArray = [];
                let maxVenuePriceArray = [];
                let minPerPaxArray = [];
                let maxPerPaxArray = [];
                this.finalVenueList.forEach(element => {
                    // this.facilitiesArray = [];
                    element['facilities'] = [];
                    let swimmingObj = {
                        'title': 'Swimming Pool',
                        'details': element.swimmingdetails,
                        // 'icon': "assets/img/svg/AC.svg",
                    }
                    let parkingObj = {
                        'title': 'Parking',
                        'details': element.parkingdetails,
                        // 'icon': "assets/img/svg/parking.svg",
                    }
                    let acObj = {
                        'title': 'A/C',
                        'details': element.acdetails,
                        // 'icon': "assets/img/svg/AC.svg",
                    }
                    let roomsObj = {
                        'title': "Rooms",
                        'details': element.capacityDescription,
                        // 'icon': "assets/img/svg/Hall.svg",
                    }
                    let powerBackupObj = {
                        'title': 'Power Backup',
                        'details': element.powerbackupdetails,
                        // 'icon': "assets/img/svg/AC.svg",
                    }
                    let djObj = {
                        'title': 'DJ',
                        'details': element.djdetails,
                        // 'icon': "assets/img/svg/AC.svg",
                    }
                    let entertainmentLicenseObj = {
                        'title': 'Entertainment License',
                        'details': element.entertainmentlicensedetails,
                        // 'icon': "assets/img/svg/parking.svg",
                    }
                    // let danceFloorObj = {
                    //     'title': 'Dance Floor',
                    //     'details': element.dancefloordetails,
                    //     // 'icon': "assets/img/svg/parking.svg",
                    // }
                    // let privatePartiesObj = {
                    //     'title': 'Private Parties',
                    //     'details': element.privatepartiesdetails,
                    //     // 'icon': "assets/img/svg/parking.svg",
                    // }
                    // let waiterServiceObj = {
                    //     'title': 'Waiter Service',
                    //     'details': element.waiterservicedetails,
                    //     // 'icon': "assets/img/svg/parking.svg",
                    // }
                    // let vipSectionObj = {
                    //     'title': 'VIP Section',
                    //     'details': element.vipsectiondetails,
                    //     // 'icon': "assets/img/svg/parking.svg",
                    // }
                    // let pillarFreeObj = {
                    //     'title': 'Waiter Service',
                    //     'details': element.pillarfreedetails,
                    //     // 'icon': "assets/img/svg/parking.svg",
                    // }
                    if (element.isSwimmingPool == true) {
                        element['facilities'].push(swimmingObj);
                    }
                    if (element.isParking == true) {
                        element['facilities'].push(parkingObj);
                    }
                    if (element.isAC == true) {
                        element['facilities'].push(acObj);
                    }
                    if (element.isGreenRooms == true) {
                        element['facilities'].push(roomsObj);
                    }
                    if (element.isPowerBackup == true) {
                        element['facilities'].push(powerBackupObj);
                    }
                    if (element.isDJ == true) {
                        element['facilities'].push(djObj);
                    }
                    if (element.isEntertainmentLicense == true) {
                        element['facilities'].push(entertainmentLicenseObj);
                    }
                    // //if (element.capacityDescription != '' && element.capacityDescription != undefined) {
                    // element['facilities'].push(danceFloorObj);
                    // //}
                    // //if (element.capacityDescription != '' && element.capacityDescription != undefined) {
                    // element['facilities'].push(privatePartiesObj);
                    // //}
                    // //if (element.capacityDescription != '' && element.capacityDescription != undefined) {
                    // element['facilities'].push(waiterServiceObj);
                    // //}
                    // //if (element.capacityDescription != '' && element.capacityDescription != undefined) {
                    // element['facilities'].push(vipSectionObj);
                    // //}
                    // //if (element.capacityDescription != '' && element.capacityDescription != undefined) {
                    // element['facilities'].push(waiterServiceObj);
                    // //}
                    // //if (element.capacityDescription != '' && element.capacityDescription != undefined) {
                    // element['facilities'].push(pillarFreeObj);
                    // //}
                    if (this.filterVenueIds[0] === element.id) {
                        //this.selectedVenueIds.push(element.id);
                        // console.log('loop in', this.selectedFilter);
                        this.selectedVenueList = [element];
                        if (this.selectedFilter !== undefined) {
                            this.selectedFilter.forEach(sElement => {
                                let index = this.findIndexById(sElement.id, this.selectedFilter);
                                if (index == -1) {
                                    this.selectedFilter.push(element);
                                }
                            })
                            //console.log(this.selectedFilter);
                        } else {
                            this.selectedFilter = [element];
                        }
                    }

                    this.allFoodMenuPriceArray = [];
                    let foodMenuArray = [];
                    if (element.foodMenuType) {
                        //element.foodMenuType.forEach(fElement => {
                        if (element.foodMenuType.jainFood !== undefined) {
                            if (element.foodMenuType.jainFood.length > 0) {
                                element.foodMenuType.jainFood.forEach(jfElement => {
                                    if (jfElement.value > 0) {
                                        this.allFoodMenuPriceArray.push(jfElement.value);
                                        jfElement.foodType = 'Jain Food';
                                        foodMenuArray.push(jfElement);
                                    }
                                });
                            }
                        }
                        if (element.foodMenuType.mixFood !== undefined) {
                            if (element.foodMenuType.mixFood.length > 0) {
                                element.foodMenuType.mixFood.forEach(mfElement => {
                                    if (mfElement.value > 0) {
                                        this.allFoodMenuPriceArray.push(mfElement.value);
                                        mfElement.foodType = 'Mix Food';
                                        foodMenuArray.push(mfElement);
                                    }
                                });
                            }
                        }
                        if (element.foodMenuType.non_veg !== undefined) {
                            if (element.foodMenuType.non_veg.length > 0) {
                                element.foodMenuType.non_veg.forEach(nvElement => {
                                    if (nvElement.value > 0) {
                                        this.allFoodMenuPriceArray.push(nvElement.value);
                                        nvElement.foodType = 'Non Veg Food';
                                        foodMenuArray.push(nvElement);
                                    }
                                });
                            }
                        }
                        if (element.foodMenuType.veg_food !== undefined) {
                            if (element.foodMenuType.veg_food.length > 0) {
                                element.foodMenuType.veg_food.forEach(vElement => {
                                    if (vElement.value > 0) {
                                        this.allFoodMenuPriceArray.push(vElement.value);
                                        vElement.foodType = 'Veg Food';
                                        foodMenuArray.push(vElement);
                                    }
                                });
                            }
                        }
                        // });
                    }
                    let minPrice = 0;
                    let maxPrice = 0;
                    if (this.allFoodMenuPriceArray.length > 0) {
                        minPrice = Math.min(...this.allFoodMenuPriceArray)
                    }
                    if (this.allFoodMenuPriceArray.length > 0) {
                        maxPrice = Math.max(...this.allFoodMenuPriceArray)
                    }
                    let guestCount = this.guestCount;
                    // if (guestCount < Number(500)) {
                    //     guestCount = Number(500);
                    // }
                    element['minCapacity'] = guestCount;
                    let foodMenu = foodMenuArray.find(x => x.value == minPrice);
                    element['minFoodType'] = foodMenu;
                    element['minVenuePrice'] = Number(minPrice) * (guestCount);
                    element['maxVenuePrice'] = Number(maxPrice) * (guestCount);
                    element['showSendEnquiry'] = false;
                    element['selectedStatus'] = false;
                    if (element['minRevenue'] > element['minVenuePrice']) {
                        element['showSendEnquiry'] = true;
                    }
                    element['minPerPax'] = Number(minPrice);
                    element['maxPerPax'] = Number(maxPrice);
                    if (element['minVenuePrice'] > 0) {
                        minVenuePriceArray.push(element['minVenuePrice']);
                    }
                    if (element['maxVenuePrice'] > 0) {
                        maxVenuePriceArray.push(element['maxVenuePrice']);
                    }
                    if (element['minPerPax'] > 0) {
                        minPerPaxArray.push(element['minPerPax']);
                    }
                    if (element['maxPerPax'] > 0) {
                        maxPerPaxArray.push(element['maxPerPax']);
                    }
                    this.selectedCompareVenues.forEach(scElement => {
                        if (scElement.id === element.id) {
                            element['selectedStatus'] = true;
                        }
                    })
                });
                let minVenuePrice = 0;
                let maxVenuePrice = 0;
                let minPerPaxPrice = 0;
                let maxPerPaxPrice = 0;
                if (minVenuePriceArray.length > 0) {
                    minVenuePrice = Math.min(...minVenuePriceArray)
                }
                if (minVenuePriceArray.length > 0) {
                    maxVenuePrice = Math.max(...minVenuePriceArray)
                }
                if (minPerPaxArray.length > 0) {
                    minPerPaxPrice = Math.min(...minPerPaxArray)
                }

                if (maxPerPaxArray.length > 0) {
                    maxPerPaxPrice = Math.max(...minPerPaxArray)
                }
                this.venuePriceRangeValues = [minVenuePrice, maxVenuePrice];
                this.rangeValues = [minPerPaxPrice, maxPerPaxPrice];
                // this.minValue = Number(minVenuePrice);
                // this.maxValue = Number(maxVenuePrice);
                // this.priceSliderOptions.floor = this.minValue;
                // this.priceSliderOptions.ceil = this.maxValue;
                this.totalRecords = data.data.totalCount;
                //}

                this.finalVenueList.sort((a, b) => Number(a['minVenuePrice']) - Number(b['minVenuePrice']));
                if (this.selectedSort != null) {
                    if (this.selectedSort.value === 'price_low_high') {
                        this.finalVenueList.sort((a, b) => Number(a['minVenuePrice']) - Number(b['minVenuePrice']));
                    }

                    if (this.selectedSort.value === 'price_high_low') {
                        let test = this.finalVenueList.sort((a, b) => Number(b['minVenuePrice']) - Number(a['minVenuePrice']));
                    }
                    if (this.selectedSort.value === 'ratings') {
                        this.finalVenueList.sort((a, b) => Number(b['eazyVenueRating']) - Number(a['eazyVenueRating']));
                    }
                    if (this.selectedSort.value === 'popularity') {
                        this.finalVenueList.sort((a, b) => Number(b['views']) - Number(a['views']));
                    }
                }

            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
    getVenueDetails(id) {
        this.urlMode = "venue_details";
        let selectedCities = JSON.stringify(this.selectedCities);
        let selectedSubareaIds = JSON.stringify(this.selectedSubareaIds);
        let selectedVenueIds = JSON.stringify(this.selectedVenueIds);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(
            ['/venue/' + id],
            {
                queryParams: {
                    startDate: this.startDate, endDate: this.endDate, capacity: this.capacity, occasion: this.selectedCategories, city: selectedCities,
                    area: selectedSubareaIds, venue: selectedVenueIds
                }
            }
        );

    }
    onclickcompare() {
        this.router.navigate(['/compare'])
        // window.open("/compare")
    }
    filterCountry(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.cities.length; i++) {
            let country = this.cities[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
    }
    onCapacitySelect(event) {
        if (event != undefined) {
            if (event.value.value > this.venueCapacity) {
            }
            this.selectedVenueCapacity = event.value.value;
            this.selectedGuestName = event.value.label;
        }
    }
    onchange(venue, event) {
        if (event.checked !== undefined && event.checked === true) {
            //console.log(this.venueid);

            if (this.selectedCompareVenues.length < 4) {
                this.selectedCompareVenues.push(venue);
                //this.selectedCompareVenues.push(venue);
                //this.venueid.push(venue.id);
                this.venueService.passvenueID(this.selectedCompareVenues);
                this.venuearray = this.selectedCompareVenues;
                this.selectedCompareVenues.forEach(e => {


                    //this.venuearray.push(this.venueDataById)
                    // this.venueService.getVenueDetails(e[0]).subscribe(res => {

                    // }
                    // )

                    if (e.id === venue.id) {
                        let venueData = this.finalVenueList.find(x => x.id == e.id);

                        this.venueDataById = venueData;
                        this.venueimg = venueData['venueImage'][0]['venue_image_src'];
                        let vIndex = this.findArrayIndexId(venue.id, this.finalVenueList);
                        if (vIndex != -1) {
                            this.finalVenueList[vIndex].selectedStatus = true;
                        }
                    }
                })
            }
        } else {
            let index = this.findIndexId(venue.id, this.venueid);
            // if (index != -1) {
            //     this.venueid.splice(index, 1);
            // }
            let vIndex = this.findArrayIndexId(venue.id, this.finalVenueList);
            if (vIndex != -1) {
                this.finalVenueList[vIndex].selectedStatus = false;
            }
            let venueIndex = this.findIndexById(venue.id, this.venuearray);
            if (venueIndex != -1) {
                this.venuearray.splice(venueIndex, 1);
            }
            let sIndex = this.findArrayIndexId(venue.id, this.selectedCompareVenues);

            if (sIndex != -1) {
                this.selectedCompareVenues.splice(sIndex, 1);
                //this.changeDetectorRef.detectChanges();
            }
        }

        this.showbottombar = true;
        // this.changeDetectorRef.detectChanges();
    }
    onCompareClick() {
        this.tokenStorageService.saveCompare(this.venuearray);
        this.router.navigate(['/compare']);
    }
    // onchange(event) {
    //     if (this.venueid.length < 4) {
    //         this.venueid.push(event.checked);
    //         this.venueService.passvenueID(this.venueid);
    //         this.venuearray = [];
    //         this.venueid.forEach(e => {
    //             let venueData = this.finalVenueList.find(x => x.id == e[0]);
    //             this.venueDataById = venueData;
    //             this.venueimg = venueData['venueImage'][0]['venue_image_src']
    //             this.venuearray.push(this.venueDataById)
    //             // this.venueService.getVenueDetails(e[0]).subscribe(res => {

    //             // }
    //             // )
    //         })
    //     }
    //     this.showbottombar = true;
    // }
    findIndexId(id, arrayName) {
        let index = -1;
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i] === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findArrayIndexId(id, arrayName) {
        let index = -1;
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    onremove(id) {
        let index = this.findIndexId(id, this.venueid);
        if (index != -1) {
            this.venueid.splice(index, 1);
        }
        let vIndex = this.findArrayIndexId(id, this.finalVenueList);
        if (vIndex != -1) {
            this.finalVenueList[vIndex].selectedStatus = false;
        }
        let venueIndex = this.findIndexById(id, this.venuearray);
        if (venueIndex != -1) {
            this.venuearray.splice(venueIndex, 1);
        }
    }
    clearAll() {
        this.venuearray = [];
        this.selectedCompareVenues = [];
        this.finalVenueList.forEach(element => {
            element.selectedStatus = false;
        });
        this.showbottombar = false;

    }

    open(event) {
        console.log(event)
        this.activeIndex = 0;
        this.displayBasic = true;
        let venueData = '';
        this.venueImages = [];
        venueData = this.finalVenueList.find(x => x.id == event);
        this.venueImages = venueData['venueImage'];
      
    }
    onScrollDown() {
        this.pageNumber++;
        this.direction = "down";
        this.getVenueList(this.lazyLoadEvent, this.mode);
    }
    @HostListener('window:keyup.esc', ['$event']) w(e: KeyboardEvent) {
        this.displayBasic = false;
    }

    close() {
        this.showVenueListFilter = false;
        console.log(this.showVenueListFilter);
    }

    showOfferDialog() {
        this.urlMode = "venue_list";
        if (this.selectedCategoryId == undefined) {
            this.messageService.add({ key: 'toastmsg', severity: 'error', summary: 'Error', detail: 'Please select venue occasion.', life: 3000 });
            return;
        }
        if (this.selectedCities.length === 0 && this.selectedSubareaIds.length === 0 && this.selectedVenueIds.length === 0) {
            this.messageService.add({ key: 'toastmsg', severity: 'error', summary: 'Error', detail: 'Please enter city or area or venue.', life: 3000 });
            return;
        }
        if (this.capacity === undefined) {
            this.messageService.add({ key: 'toastmsg', severity: 'error', summary: 'Error', detail: 'Please select guest count.', life: 3000 });
            return;
        }
        if (this.startDate === undefined && this.endDate === undefined) {
            this.messageService.add({ key: 'toastmsg', severity: 'error', summary: 'Error', detail: 'Please select date.', life: 3000 });
            return;
        }
        if (this.isLoggedIn == false) {
            this.numberPopup = true;
            this.otpPopup = false;
            this.otpthankyouPopup = false;
            this.ngxotp.clear();
            this.otp = undefined;
        } else {
            let selectedCities = JSON.stringify(this.selectedCities);
            let selectedSubareaIds = JSON.stringify(this.selectedSubareaIds);
            let selectedVenueIds = JSON.stringify(this.selectedVenueIds);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(
                ['/venue-list'],
                {
                    queryParams: {
                        startDate: this.startDate, endDate: this.endDate, capacity: this.capacity, occasion: this.selectedCategoryId, city: selectedCities,
                        area: selectedSubareaIds, venue: selectedVenueIds
                    }
                }
            );
        }
    }


}
