import {makeAutoObservable} from "mobx";
import DetailAttachmentRequest from "../handlers/detail/DetailAttachmentRequest";
import DetailAttachmentHandler from "../handlers/detail/DetailAttachmentHandler";
import DetailAttachmentResponse from "../handlers/detail/DetailAttachmentResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import {message} from "antd";

export default class DetailAttachmentViewModel {
    attachment: DetailAttachmentResponse;
    isProcessing: boolean;
    errorMessage: string;

    constructor() {
        makeAutoObservable(this);
    }

    public async detailAllAttachment(attachmentId: number) {
        try {
            this.isProcessing = true;
            let detailAttachmentsRequest: DetailAttachmentRequest = new DetailAttachmentRequest(attachmentId);
            let response = await DetailAttachmentHandler.detail(detailAttachmentsRequest);
            this.attachment = new DetailAttachmentResponse();
            if (response && response.success) {
                
                this.attachment = response.data;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Attachments.Error.Detail.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
