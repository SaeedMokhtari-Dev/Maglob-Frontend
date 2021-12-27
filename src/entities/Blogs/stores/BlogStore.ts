import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditBlogViewModel from "../view-models/EditBlogViewModel";
import GetBlogViewModel from "../view-models/GetBlogViewModel";


export default class BlogStore
{
    getBlogViewModel: GetBlogViewModel;
    editBlogViewModel: EditBlogViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onBlogGetPageLoad()
    {
        this.getBlogViewModel = new GetBlogViewModel(this);
    }

    onBlogGetPageUnload()
    {
        this.getBlogViewModel = null;
    }

    onBlogEditPageLoad()
    {
        this.editBlogViewModel = new EditBlogViewModel(this);
    }

    onBlogEditPageUnload()
    {
        this.editBlogViewModel = null;
    }

}
