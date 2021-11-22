import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditTestimonialViewModel from "../view-models/EditTestimonialViewModel";
import GetTestimonialViewModel from "../view-models/GetTestimonialViewModel";


export default class TestimonialStore
{
    getTestimonialViewModel: GetTestimonialViewModel;
    editTestimonialViewModel: EditTestimonialViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onTestimonialGetPageLoad()
    {
        this.getTestimonialViewModel = new GetTestimonialViewModel(this);
    }

    onTestimonialGetPageUnload()
    {
        this.getTestimonialViewModel = null;
    }

    onTestimonialEditPageLoad()
    {
        this.editTestimonialViewModel = new EditTestimonialViewModel(this);
    }

    onTestimonialEditPageUnload()
    {
        this.editTestimonialViewModel = null;
    }

}
