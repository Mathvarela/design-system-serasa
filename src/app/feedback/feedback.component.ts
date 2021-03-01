import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ApiRequestService } from '../request/api-request';
import { Feedback, Rates } from './shared/feedback.model';
declare var $: any;

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    providers: [ApiRequestService]
})
export class FeedbackComponent implements OnInit {
    modal: HTMLElement;
    rating: HTMLElement;
    rates: Array<any>;
    payload: Feedback = {} as Feedback;

    ratingArray: Array<Rates> = new Array<Rates>();

    constructor(private api: ApiRequestService) { }

    ngOnInit(): void {
        this.modal = document.getElementById('myModal');
        this.rating = document.getElementById('rating');

        this.ratingArray.push({ valor: 1 }, { valor: 2 }, { valor: 3 }, { valor: 4 }, { valor: 5 })
    }

    openModal() {
        this.modal.style.display = "flex";
    }

    rateSelected() {
        this.rates = Array.from(this.rating.getElementsByClassName('rate'));
        this.rates.forEach((rate) => {
            const value = Number(rate.dataset.value);
            rate.onclick = () => {
                this.rates.forEach((r, index) => {
                    if (index + 1 <= value) {
                        r.classList.add('checked');
                    } else {
                        r.classList.remove('checked');
                    }
                })
            }

            this.payload.rating = value;
        });
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.clearPayload();
    }

    clearPayload() {
        this.payload = {} as Feedback;

        this.rates = Array.from(this.rating.getElementsByClassName('rate'));
        this.rates.forEach((r) => {
            r.classList.remove('checked');
        });
    }

    mouseoverRate(rate: any) {
        const value = Number(rate.target.dataset.value);
        this.rates = Array.from(this.rating.getElementsByClassName('rate'));

        if (value) {
            this.rates.forEach((r, index) => {
                if (index + 1 <= value) {
                    r.classList.add('checked');
                } else {
                    r.classList.remove('checked');
                }
            });

            this.payload.rating = value;
        } else {
            this.rates.forEach((r) => {
                r.classList.remove('checked');
            });
        }
    }

    async requestFeedback() {
        const promise = this.api.post('https://5f4b11f341cb390016de37aa.mockapi.io/api/v1/feedback', this.payload).toPromise();

        await promise.then((response) => {
            console.log(response.json());
            this.closeModal();
        }).catch((error) => {
            console.log(error);
        });
    }

}
