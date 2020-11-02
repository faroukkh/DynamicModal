/**
 * Open a Dynamic Modal 
 * @param {string} title Modal Title 
 * @param {string} loadLink Get Method to get the form or load a detail page (Partial View is recommended) 
 * @param {any} params parameters to be sent in your request
 * @param {string} placeholderId Div id where the result of this request will be placed after after submitting the form located in the modal
 * @param {boolean} closeModal close modal after submitting the form located in the modal
 * @param {Function} ModalOnReadyCallBackFunction Name of the callback to executed after Modal is ready
 * @param {Function} ModalAfterSubmitCallBackFunction Name of the callback to execute after submitting the form located in the modal
 */

const ModalSize = {
    Default: 'modal-sm',
    Medium: 'modal-md',
    Large: 'modal-lg',
    XLarge: 'modal-xl'
}
class DynamicModal {
    constructor(id = "") {
        this.showDynamicModal = (title = "", loadLink, params, modalSize = ModalSize, placeholderId, closeModal = true, ModalOnReadyCallBackFunction = () => { }, ModalAfterSubmitCallBackFunction = () => { }, updatedPlaceholderAnimation = false) => {
            $('.loadingContainer').show();
            $('#placeHolderId' + id).val(placeholderId);
            $('#placeHolderId' + id).attr('closeModal', closeModal);
            _formvalue = "";
            _submitted = false;
            _changecolorEnabled = updatedPlaceholderAnimation;

            $('#DynamicModal' + id).unbind().on('hidden.bs.modal', () => { $('#ModelContainer' + id).html(''); });
            $("#DynamicModal" + id + " > .modal-dialog").addClass(modalSize);
            var paramstr = '?';
            $.each(params, (key, value) => {
                paramstr += key + "=" + value + "&";
            });
            $('#ModelTitle' + id).text(title);

            $.ajax({
                type: 'GET',
                url: loadLink + paramstr,
                datatype: 'json',
                success: (data) => {

                    var bError = false;
                    var bLogout = false;
                    var bAccessDenied = false;
                    if (data.StatusCode != undefined && data.StatusDescription != "") {
                        if (data.StatusCode == 500) {
                            bError = true;
                        }
                        else if (data.StatusCode == 401) {
                            bLogout = true;
                        }
                        else if (data.StatusCode == 203) {
                            bAccessDenied = true;
                        }
                        else if (data.StatusCode == 302) {
                            window.location.replace(data.StatusDescription);
                        }

                        var da = DynamicAlert.init();
                        if (bError) {
                            da.ShowAlert(data.StatusDescription, AlertType.Error);
                        }


                        //alert(data.StatusDescription);

                        if (bLogout) {
                            location.reload();
                        }
                    }
                    if (bError == false && bAccessDenied == false) {
                        if (data.HTML != undefined && data.HTML != "") {
                            $("#ModelContainer" + id).html(data.HTML);
                        }
                        else {
                            $("#ModelContainer" + id).html(data);
                        }

                        FormAjaxSubmit(id, ModalAfterSubmitCallBackFunction);

                        $('#DynamicModal' + id).modal('show');
                    }



                    $('.loadingContainer').hide();

                    if (bError == false && (typeof ModalOnReadyCallBackFunction == "function")) {
                        ModalOnReadyCallBackFunction();
                    }
                },
                error: function () {
                    $('.loadingContainer').hide();
                    var da = DynamicAlert.init();
                    da.ShowAlert("Internal Server Error", AlertType.Error);
                }
            });

        }


        this.Id = id;
        const changecolor = (id) => {
            setTimeout(() => {
                var oldcolor = $("#" + $('#placeHolderId' + id).val()).css("background-color");
                $("#" + $('#placeHolderId' + id).val()).css("background-color", "#adb5bd4d");

                if (oldcolor == null || oldcolor == undefined || oldcolor == "") {
                    $("#" + $('#placeHolderId' + id).val()).animate({ backgroundColor: "" }, 4000);
                }
                else {
                    $("#" + $('#placeHolderId' + id).val()).animate({ backgroundColor: oldcolor }, 4000);
                }
            }, 100);
        }
        const FormAjaxSubmit = function (id = "", afterSubmitCallBack = null) {
            $("#ModelContainer" + id + " form").each(function () {

                jQuery.validator.unobtrusive.parse();
                //or to give the parser some context, supply it with a selector
                //jQuery validator will parse all child elements (deep) starting
                //from the selector element supplied
                if ($(this).attr('id') == undefined) {
                    $(this).attr('id', 'form1');
                }
                var formId = $(this).attr('id');

                $('#' + formId).append('<div class="modal-footer"></div>');
                $('#' + formId + ' .modal-footer').append($("#ModelContainer" + id + " .btn-dynamicmodal"), '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');

                _formvalue = $('#' + formId).serialize();

                $("#DynamicModal" + id).on('hide.bs.modal', function (e) {
                    if (_formvalue != $('#' + formId).serialize() && _submitted == false) {
                        var ret = confirm("There is some unsaved changes, Are you sure do you want to leave?");
                        if (ret != true) {
                            return false;
                        }
                    }
                });

                jQuery.validator.unobtrusive.parse('#' + $(this).attr('id'));

                $(this).unbind().submit(function (event) {
                    event.preventDefault(); //prevent default action

                    if (!$(this).valid()) {
                        return false;
                    }

                    var post_url = $(this).attr("action"); //get form action url
                    var request_method = $(this).attr("method"); //get form GET/POST method
                    var form_data = $(this).serialize(); //Encode form elements for submission


                    $('.loadingContainer').show();
                    $.ajax({
                        url: post_url,
                        type: request_method,
                        data: form_data,
                        success: function (data) {
                            var bError = false;
                            var bLogout = false;

                            if (data.StatusCode != undefined && data.StatusDescription != "") {
                                if (data.StatusCode == 500) {
                                    bError = true;
                                }
                                else if (data.StatusCode == 401) {
                                    bLogout = true;
                                }
                                else if (data.StatusCode == 302) {
                                    window.location.replace(data.StatusDescription);
                                }
                                if (bLogout) {
                                    alert(data.StatusDescription);
                                    location.reload();
                                    return;
                                }

                                var da = DynamicAlert.init();
                                if (bError) {
                                    da.ShowAlert(data.StatusDescription, AlertType.Error);
                                }
                                else {
                                    da.ShowAlert(data.StatusDescription, AlertType.Success);
                                }

                                if ($('#placeHolderId' + id).val() != "" && $('#placeHolderId' + id).val() != undefined) {
                                    if (data.HTML != undefined && data.HTML != "") {
                                        $("#" + $('#placeHolderId' + id).val()).html(data.HTML);
                                        if (_changecolorEnabled) {
                                            changecolor(id);
                                        }
                                    }
                                }
                            }
                            else if ($('#placeHolderId' + id).val() != "" && $('#placeHolderId' + id).val() != undefined) {
                                if (data.HTML != undefined && data.HTML != "") {
                                    $("#" + $('#placeHolderId' + id).val()).html(data.HTML);
                                }
                                else {
                                    $("#" + $('#placeHolderId' + id).val()).html(data);
                                }

                                if (_changecolorEnabled) {
                                    changecolor(id);
                                }

                            }

                            if (typeof afterSubmitCallBack == "function" && bError == false) {
                                afterSubmitCallBack();
                            }
                            _submitted = true;
                            if ($('#placeHolderId' + id).attr('closeModal') == "true" && bError == false) {
                                $('#DynamicModal' + id).modal('hide');
                                $("#ModelContainer" + id).html('');
                            }
                            else {
                                _formvalue = $('#' + formId).serialize();
                                _submitted = false;
                            }
                            $('.loadingContainer').hide();

                        },
                        error: function (xhr, status, ErrorMessage) {

                            alert('Error occurred!');
                            $('.loadingContainer').hide();
                            _formvalue = "";
                        }
                    }
                    );
                });
            });

            if ($("#ModelContainer" + id + "  form").length == 0) {
                if ($("#ModelContainer" + id + " .btn-dynamicmodal").length == 0) {
                    $('#DynamicModal ' + id + ' #ModelContainer' + id).append('<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>');
                } else {
                    $('#DynamicModal ' + id + ' #ModelContainer' + id).append('<div class="modal-footer"></div>');
                    $('#DynamicModal ' + id + ' #ModelContainer' + id + ' .modal-footer').append($("#ModelContainer" + id + " .btn-dynamicmodal"), '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');

                }
            }

        }
        var _formvalue = "";
        var _unsavedChanges = false;
        var _submitted = false;
        var _changecolorEnabled = false;


        this.hideModal = () => {
            $('#DynamicModal' + this.Id).modal('hide');
        }

    }
    static init(id = "") {

        $('body').append('<div class="modal-dark modal fade" id="DynamicModal' + id + '" tabindex="-1" role="dialog" aria-labelledby="ModelTitle' + id + '" aria-hidden="true"><input type = "hidden" id = "placeHolderId' + id + '" /><div class="modal-dialog" role="document"><div class="modal-content" style="border: solid 1px;"><div class="modal-header text-center"><span class="modal-title h3 text-center" id="ModelTitle' + id + '"> </span><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="ModelContainer' + id + '"></div></div></div></div>');
        return new DynamicModal(id);
    }
}

const AlertType = {
    Error: 'alert-danger',
    Success: 'alert-success',
    Info: 'alert-info'
}
var DynamicAlertCount = 0;
class DynamicAlert {

    constructor() {
        this.ShowAlert = (Message, alertType = AlertType) => {
            DynamicAlertCount += 1;
            appendBody(DynamicAlertCount);
            $('#DynamicAlert' + DynamicAlertCount).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-info");
            $('#DynamicAlert' + DynamicAlertCount).addClass(alertType);
            $('#DynamicAlertMessage' + DynamicAlertCount).html(Message);
            autohide(DynamicAlertCount);

        }


        this.ShowAlertAjax = (data) => {
            DynamicAlertCount += 1;
            appendBody(DynamicAlertCount);
            var bError = false;
            var bLogout = false;
            $('#DynamicAlert' + DynamicAlertCount).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-info");
            if (data.StatusCode != undefined && data.StatusDescription != "") {
                $('#DynamicAlertMessage' + DynamicAlertCount).html(data.StatusDescription);

                if (data.StatusCode == 500) {
                    bError = true;
                    $('#DynamicAlert' + DynamicAlertCount).addClass(AlertType.Error);
                }
                else if (data.StatusCode == 401) {
                    bLogout = true;
                    $('#DynamicAlert' + DynamicAlertCount).addClass(AlertType.Error);
                    alert(data.StatusDescription);
                }
                else if (data.StatusCode == 302) {
                    window.location.replace(data.StatusDescription);
                }
                else {
                    $('#DynamicAlert' + DynamicAlertCount).addClass(AlertType.Success);
                }
                if (bLogout) {
                    location.reload();
                }
                return !bError;

            }
        }
        const autohide = (id) => {
            setTimeout(function () {
                $('#DynamicAlert' + id).alert("close");
            }, 8000);
        }
        const appendBody = (counter) => {

            $('div#DynamicAlerts').append('<div class="col-12 alert alert-dismissible"  style="z-index:100000" Id="DynamicAlert' + counter + '"  role="alert" ><button class="close"  style="width:10px; height:10px;color:black;  padding-bottom: 19px;" type="button" data-dismiss="alert" aria-hidden="true"><span class="">x</span> </button> <span id="DynamicAlertMessage' + counter + '"></span></div>');
        }

    }

    static init() {

        if ($('#DynamicAlerts').length == 0) {
            $('body').prepend('<div id="DynamicAlerts" class="container-fluid" style="position: -webkit-sticky; position: fixed !important; top: 0px; z-index: 100000000000; min-width:100%;"></div>');
        }
        return new DynamicAlert();
    }
}
