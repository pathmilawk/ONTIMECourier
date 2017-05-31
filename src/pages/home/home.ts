import { Component } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Proceed } from '../proceed/proceed';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

deliveryFrom: String;

	address: any = {
		place: '',
		set: false,
	};
	placesService: any;
	map: any;
	markers = [];
	placedetails: any;

	distance:any;
	duration:any;

	autocompleteItems: any;
	autocompleteItems2: any;
	autocomplete: any;
	autocomplete2: any;
	acService: any;

  constructor(public navCtrl: NavController, public events: Events, public atrCtrl: AlertController, public navPrmCtrl: NavParams) {
    this.deliveryFrom = ""
  }

  ionViewDidLoad() {
      this.events.publish('user:profiledetails');
    }

    ngOnInit() {
			
			this.initMap();
			this.initPlacedetails();

			this.acService = new google.maps.places.AutocompleteService();
			this.autocompleteItems = [];
			this.autocompleteItems2 = [];

			this.autocomplete = {
				query: ''
			};

			this.autocomplete2 = {
				query: ''
			};

		}


	private initMap() {

		var point = { lat: 6.9147682, lng: 79.9731200 };

		//current location
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		});



		let divMap = (<HTMLInputElement>document.getElementById('map'));

		this.map = new google.maps.Map(divMap, {
			center: point,
			zoom: 15,
			disableDefaultUI: true,
			draggable: true,
			zoomControl: true
		});




		var marker = new google.maps.Marker({
			position: point,
			map: this.map,
			title: 'Current location',
			animation: google.maps.Animation.DROP
		});

		//add marker to current location
		marker.addListener('click', toggleBounce);

		function toggleBounce() {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}
	}




private initPlacedetails() {
		this.placedetails = {
			address: '',
			lat: '',
			lng: '',
			components: {
				route: { set: false, short: '', long: '' },                           // calle
				street_number: { set: false, short: '', long: '' },                   // numero
				sublocality_level_1: { set: false, short: '', long: '' },             // barrio
				locality: { set: false, short: '', long: '' },                        // localidad, ciudad
				administrative_area_level_2: { set: false, short: '', long: '' },     // zona/comuna/partido
				administrative_area_level_1: { set: false, short: '', long: '' },     // estado/provincia
				country: { set: false, short: '', long: '' },                         // pais
				postal_code: { set: false, short: '', long: '' },                     // codigo postal
				postal_code_suffix: { set: false, short: '', long: '' },              // codigo postal - sufijo
			}
		};
	}

	private reset() {
		this.initPlacedetails();
		this.address.place = '';
		this.address.set = false;
	}

	private getPlaceDetail(place_id: string): void {
		var self = this;
		var request = {
			placeId: place_id
		};
		this.placesService = new google.maps.places.PlacesService(this.map);
		this.placesService.getDetails(request, callback);
		function callback(place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log('page > getPlaceDetail > place > ', place);
				// set full address
				self.placedetails.address = place.formatted_address;
				self.placedetails.lat = place.geometry.location.lat();
				self.placedetails.lng = place.geometry.location.lng();
				for (var i = 0; i < place.address_components.length; i++) {
					let addressType = place.address_components[i].types[0];
					let values = {
						short_name: place.address_components[i]['short_name'],
						long_name: place.address_components[i]['long_name']
					}
					if (self.placedetails.components[addressType]) {
						self.placedetails.components[addressType].set = true;
						self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
						self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
					}
				}
				// set place in map
				self.map.setCenter(place.geometry.location);
				self.createMapMarker(place);
				// populate
				self.address.set = true;
				console.log('page > getPlaceDetail > details > ', self.placedetails);
			} else {
				console.log('page > getPlaceDetail > status > ', status);
			}
		}
	}

	private createMapMarker(place: any): void {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: this.map,
			position: placeLoc,
			title: place.placeName
		});
		this.markers.push(marker);
	}

	updateSearch() {
		console.log('modal > updateSearch');
		if (this.autocomplete.query == '') {
			this.autocompleteItems = [];
			return;
		}


		let self = this;
		let config = {
			types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
			input: this.autocomplete.query,
			componentRestrictions: { country: 'LK' }
		}
		this.acService.getPlacePredictions(config, function (predictions, status) {
			console.log('modal > getPlacePredictions > status > ', status);
			self.autocompleteItems = [];


			if (predictions != null) {
				predictions.forEach(function (prediction) {
					self.autocompleteItems.push(prediction);
				});
			}


		}); console.log(this.autocomplete.query + "mnmnm");
	}



	updateSearch2() {
		console.log('modal > updateSearch');

		if (this.autocomplete2.query == '') {
			this.autocompleteItems2 = [];
			return;
		}

		let self = this;
		let config = {
			types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
			input: this.autocomplete2.query,
			componentRestrictions: { country: 'LK' }
		}
		this.acService.getPlacePredictions(config, function (predictions, status) {
			console.log('modal > getPlacePredictions > status > ', status);

			self.autocompleteItems2 = [];


			if (predictions != null) {
				predictions.forEach(function (prediction) {
					self.autocompleteItems2.push(prediction);
				});
			}

		});
	}




	getPalceName(item: any) {

		var placeName = item.description;
		return placeName;
	}



	chooseItem(item: any) {
		console.log('modal > chooseItem > item > ', item.description);
		if (item) {
			this.address.place = item.description;
			console.log(this.address.place);
			// Update Value in search box
			this.autocomplete = {
				query: item.description
			};

			// get details
			this.getPlaceDetail(item.place_id);
			this.autocompleteItems = [];
		}




	}


	chooseItem2(item: any) {
		console.log('modal > chooseItem > item > ', item.description);

		if (item) {

			this.address.place = item.description;
			console.log(this.address.place);

			// Update Value in search box
			this.autocomplete2 = {
				query: item.description
			};

if(this.autocomplete.query!=""){
			// get details
			this.getPlaceDetail(item.place_id);}
			this.autocompleteItems2 = [];
		}

		this.drawPath();
		this.getDistance();
		//console.log('saman'+this.fromValue.query);

	}



	// Sets the map on all markers in the array.
	setMapOnAll(map) {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(map);
		}
	}

	// Removes the markers from the map, but keeps them in the array.
	clearMarkers() {
		this.setMapOnAll(null);
	}







	//draw path when click
	drawPath() {

		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;

		if (this.autocomplete.query != '' && this.autocomplete2.query != '') {
			console.log("drawPath > from: " + directionsService + "to: " + directionsDisplay);

			directionsDisplay.setMap(this.map);
			this.calculateAndDisplayRoute(directionsService, directionsDisplay);
			this.searchComplete();
			
		}
		else {
			this.autocomplete2.query = null;
			this.setMapOnAll(null);
			this.showAlert();

		}


	}

	//show continue button when place serche completed
	public itemClicked: boolean = false;

	public searchComplete() {

		this.itemClicked = true;
	}

	//show alert
	showAlert() {
		let alert = this.atrCtrl.create({
			title: 'Alert!',
			subTitle: 'Please fill start location and deliver location',
			buttons: ['OK']
		});
		alert.present();
	}

	//get location and draw path
	calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin: this.autocomplete.query,
			destination: this.autocomplete2.query,
			travelMode: 'DRIVING'
		}, function (response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);

			} else {
				// window.alert('Directions request failed due to ' + status);
			}
		});
	}

	//get distance and time
	getDistance() {


		var origin1 = null;
		var origin2 = this.autocomplete.query;
		var destinationA = this.autocomplete2.query;
		var destinationB = null;

		var geocoder = new google.maps.Geocoder();

		//from location
		geocoder.geocode({ 'address': this.autocomplete.query }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				origin1 = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
				//origin1.lng=;

				//alert("location : " + origin1); 
			} else {
				alert("Something got wrong " + status);
			}
		});


		//to location
		geocoder.geocode({ 'address': this.autocomplete2.query }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				destinationB = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());;
				//var b=results[0].geometry.location.lng();

				//alert("location : " + origin1+'fdfd'+origin2); 

				var service = new google.maps.DistanceMatrixService;

				service.getDistanceMatrix({
					origins: [origin1, origin2],
					destinations: [destinationA, destinationB],
					travelMode: 'DRIVING',
					unitSystem: google.maps.UnitSystem.METRIC,
					avoidHighways: false,
					avoidTolls: false
				}, function (response, status) {
					if (status !== 'OK') {
						alert('Error was: ' + status);
					} else {


						var origins = response.originAddresses;
						var destinations = response.destinationAddresses;

						for (var i = 0; i < origins.length; i++) {
							var results = response.rows[i].elements;
							console.log(results);
							for (var j = 0; j < results.length; j++) {
								var element = results[j];
								var distance = element.distance.text;
								var duration = element.duration.text;
								var from = origins[i];
								var to = destinations[j];
							}
						}

						console.log(distance + " dd " + duration);

						this.distance=distance;
						this.duration=duration;
						var arr={dis:distance,dur:duration};

						return arr;


					}
				});


			} else {
				alert("Something got wrong " + status);
			}
		});


	}


	dismiss(myText: any) {
		myText = null;

		this.clearMarkers();

	}

	//go to proceed interface
	showProceed() {
		this.initMap();

		this.itemClicked = false;

		
		


				let data={
					add1: this.autocomplete.query,
					add2: this.autocomplete2.query
				};
		
		this.navCtrl.push(Proceed,data);
		this.autocomplete.query = null;
		this.autocomplete2.query = null;
	}
}
