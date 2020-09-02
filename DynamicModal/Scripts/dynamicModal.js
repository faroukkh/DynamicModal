//const ModalSize={Default:"modal-sm",Medium:"modal-md",Large:"modal-lg",XLarge:"modal-xl"};class DynamicModal{constructor(t=""){this.showDynamicModal=((i="",r,o,n=ModalSize,d,s=!0,c=(()=>{}),u=(()=>{}))=>{$(".loadingContainer").show(),$("#placeHolderId"+t).val(d),$("#placeHolderId"+t).attr("closeModal",s),a="",l=!1,$("#DynamicModal"+t).unbind().on("hidden.bs.modal",()=>{$("#ModelContainer"+t).html("")}),$("#DynamicModal"+t+" > .modal-dialog").addClass(n);var m="?";$.each(o,(t,e)=>{m+=t+"="+e+"&"}),$("#ModelTitle"+t).text(i),$.ajax({type:"GET",url:r+m,datatype:"json",success:a=>{var l=!1,i=!1,r=!1;if(null!=a.StatusCode&&""!=a.StatusDescription){500==a.StatusCode?l=!0:401==a.StatusCode?i=!0:203==a.StatusCode&&(r=!0);var o=DynamicAlert.init();l&&o.ShowAlert(a.StatusDescription,AlertType.Error),i&&location.reload()}0==l&&0==r&&(null!=a.HTML&&""!=a.HTML?$("#ModelContainer"+t).html(a.HTML):$("#ModelContainer"+t).html(a),e(t,u),$("#DynamicModal"+t).modal("show")),$(".loadingContainer").hide(),0==l&&"function"==typeof c&&c()},error:function(){$(".loadingContainer").hide(),DynamicAlert.init().ShowAlert("Internal Server Error",AlertType.Error)}})}),this.Id=t;const e=function(t="",e=null){$("#ModelContainer"+t+" > form").each(function(){jQuery.validator.unobtrusive.parse(),null==$(this).attr("id")&&$(this).attr("id","form1");var i=$(this).attr("id");a=$("#"+i).serialize(),$("#DynamicModal"+t).on("hide.bs.modal",function(t){if(a!=$("#"+i).serialize()&&0==l&&1!=confirm("There is some unsaved changes, Are you sure do you want to leave?"))return!1}),jQuery.validator.unobtrusive.parse("#"+$(this).attr("id")),$(this).unbind().submit(function(r){if(r.preventDefault(),!$(this).valid())return!1;var o=$(this).attr("action"),n=$(this).attr("method"),d=$(this).serialize();$(".loadingContainer").show(),$.ajax({url:o,type:n,data:d,success:function(r){var o=!1,n=!1;if(null!=r.StatusCode&&""!=r.StatusDescription){if(500==r.StatusCode?o=!0:401==r.StatusCode&&(n=!0),n)return alert(r.StatusDescription),void location.reload();var d=DynamicAlert.init();o?d.ShowAlert(r.StatusDescription,AlertType.Error):d.ShowAlert(r.StatusDescription,AlertType.Success),""!=$("#placeHolderId"+t).val()&&null!=$("#placeHolderId"+t).val()&&null!=r.HTML&&""!=r.HTML&&$("#"+$("#placeHolderId"+t).val()).html(r.HTML)}else""!=$("#placeHolderId"+t).val()&&null!=$("#placeHolderId"+t).val()&&(null!=r.HTML&&""!=r.HTML?$("#"+$("#placeHolderId"+t).val()).html(r.HTML):$("#"+$("#placeHolderId"+t).val()).html(r));"function"==typeof e&&0==o&&e(),l=!0,"true"==$("#placeHolderId"+t).attr("closeModal")&&0==o?($("#DynamicModal"+t).modal("hide"),$("#ModelContainer"+t).html("")):(a=$("#"+i).serialize(),l=!1),$(".loadingContainer").hide()},error:function(t,e,l){alert("Error occurred!"),$(".loadingContainer").hide(),a=""}})})})};var a="",l=!1;this.hideModal=(()=>{$("#DynamicModal"+this.Id).modal("hide")})}static init(t=""){return $("body").append('<div class="modal-dark modal fade" id="DynamicModal'+t+'" tabindex="-1" role="dialog" aria-labelledby="ModelTitle'+t+'" aria-hidden="true"><input type = "hidden" id = "placeHolderId'+t+'" /><div class="modal-dialog" role="document"><div class="modal-content" style="border: solid 1px;"><div class="modal-header text-center"><span class="modal-title h3 text-center" id="ModelTitle'+t+'"> </span><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="ModelContainer'+t+'"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'),new DynamicModal(t)}}const AlertType={Error:"alert-danger",Success:"alert-success",Info:"alert-info"};var DynamicAlertCount=0;class DynamicAlert{constructor(){this.ShowAlert=((e,a=AlertType)=>{t(DynamicAlertCount+=1),$("#DynamicAlert"+DynamicAlertCount).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-info"),$("#DynamicAlert"+DynamicAlertCount).addClass(a),$("#DynamicAlertMessage"+DynamicAlertCount).html(e)}),this.ShowAlertAjax=(e=>{t(DynamicAlertCount+=1);var a=!1,l=!1;if($("#DynamicAlert"+DynamicAlertCount).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-info"),null!=e.StatusCode&&""!=e.StatusDescription)return $("#DynamicAlertMessage"+DynamicAlertCount).html(e.StatusDescription),500==e.StatusCode?(a=!0,$("#DynamicAlert"+DynamicAlertCount).addClass(AlertType.Error)):401==e.StatusCode?(l=!0,$("#DynamicAlert"+DynamicAlertCount).addClass(AlertType.Error),alert(e.StatusDescription)):$("#DynamicAlert"+DynamicAlertCount).addClass(AlertType.Success),l&&location.reload(),!a});const t=t=>{$("div#DynamicAlerts").append('<div class="col-12 alert alert-dismissible"  style="z-index:100000" Id="DynamicAlert'+t+'" ><div  style="padding-left: 10px;"  role="alert"><button class="close"  style="width:10px; height:10px;color:black;  padding-bottom: 19px;" type="button" data-dismiss="alert" aria-hidden="true"><span class="">x</span> </button> <span id="DynamicAlertMessage'+t+'"></span></div></div>')}}static init(){return 0==$("#DynamicAlerts").length&&$("body").prepend('<div id="DynamicAlerts" class="container-fluid"  style="position: -webkit-sticky; position: fixed !important; top: 0px; z-index: 100000000000;"></div>'),new DynamicAlert}}
//const ModalSize = { Default: "modal-sm", Medium: "modal-md", Large: "modal-lg", XLarge: "modal-xl" }; class DynamicModal { constructor(id = "") { this.showDynamicModal = ((t = "", a, e, l = ModalSize, i, n = !0, o = (() => { }), d = (() => { })) => { $(".loadingContainer").show(), $("#placeHolderId" + id).val(i), $("#placeHolderId" + id).attr("closeModal", n), this.CallBackModalOnReadyFunction = o, this.CallBackModalAfterSubmitFunction = d, $("#DynamicModal" + id).unbind().on("hidden.bs.modal", () => { $("#ModelContainer" + id).html("") }), $("#DynamicModal" + id + " > .modal-dialog").addClass(l); var r = "?"; $.each(e, (t, a) => { r += t + "=" + a + "&" }), $("#ModelTitle" + id).text(t), $.ajax({ type: "GET", url: a + r, datatype: "json", success: t => { var a = !1, e = !1, l = !1; if (null != t.StatusCode && "" != t.StatusDescription) { 500 == t.StatusCode ? a = !0 : 401 == t.StatusCode ? e = !0 : 203 == t.StatusCode && (l = !0); var i = DynamicAlert.init(); a && i.ShowAlert(t.StatusDescription, AlertType.Error), e && location.reload() } 0 == a && 0 == l && (null != t.HTML && "" != t.HTML ? $("#ModelContainer" + id).html(t.HTML) : $("#ModelContainer" + id).html(t), FormAjaxSubmit(id), $("#DynamicModal" + id).modal("show")), $(".loadingContainer").hide(), 0 == a && null != this.CallBackModalOnReadyFunction && null != this.CallBackModalOnReadyFunction && this.CallBackModalOnReadyFunction() }, error: function () { $(".loadingContainer").hide(), DynamicAlert.init().ShowAlert("Internal Server Error", AlertType.Error) } }) }), this.Id = id, this.CallBackModalOnReadyFunction, this.CallBackModalAfterSubmitFunction; const FormAjaxSubmit = function (t = "") { $("#ModelContainer" + t + " > form").each(function () { jQuery.validator.unobtrusive.parse(), null == $(this).attr("id") && $(this).attr("id", "form1"), jQuery.validator.unobtrusive.parse("#" + $(this).attr("id")), $(this).unbind().submit(function (a) { if (a.preventDefault(), !$(this).valid()) return !1; var e = $(this).attr("action"), l = $(this).attr("method"), i = $(this).serialize(); $(".loadingContainer").show(), $.ajax({ url: e, type: l, data: i, success: function (a) { var e = !1, l = !1; if (null != a.StatusCode && "" != a.StatusDescription) { if (500 == a.StatusCode ? e = !0 : 401 == a.StatusCode && (l = !0), l) return alert(a.StatusDescription), void location.reload(); var i = DynamicAlert.init(); e ? i.ShowAlert(a.StatusDescription, AlertType.Error) : i.ShowAlert(a.StatusDescription, AlertType.Success), "" != $("#placeHolderId" + t).val() && null != $("#placeHolderId" + t).val() && null != a.HTML && "" != a.HTML && $("#" + $("#placeHolderId" + t).val()).html(a.HTML) } else "" != $("#placeHolderId" + t).val() && null != $("#placeHolderId" + t).val() && (null != a.HTML && "" != a.HTML ? $("#" + $("#placeHolderId" + t).val()).html(a.HTML) : $("#" + $("#placeHolderId" + t).val()).html(a)); null != this.CallBackModalAfterSubmitFunction && null != this.CallBackModalAfterSubmitFunction && 0 == e && this.CallBackModalAfterSubmitFunction(), "true" == $("#placeHolderId" + t).attr("closeModal") && 0 == e && ($("#ModelContainer" + t).html(""), $("#DynamicModal" + t).modal("hide")), $(".loadingContainer").hide() }, error: function (t, a, e) { alert("Error occurred!"), $(".loadingContainer").hide() } }) }) }) }, ExecFunctionByName = function (functionName) { functionName.indexOf("();") > 0 ? eval(functionName) : functionName.indexOf("()") > 0 ? eval(functionName + ";") : functionName.indexOf(");") > 0 ? eval(functionName) : functionName.indexOf(")") > 0 ? eval(functionName + ";") : eval(functionName + "();") }; this.hideModal = (() => { $("#DynamicModal" + this.Id).modal("hide") }) } static init(t = "") { return $("body").append('<div class="modal-dark modal fade" id="DynamicModal' + t + '" tabindex=" - 1" role="dialog" aria-labelledby="ModelTitle' + t + '" aria-hidden="true"><input type = "hidden" id = "placeHolderId' + t + '" /><div class="modal-dialog" role="document"><div class="modal-content" style="border: solid 1px;"><div class="modal-header text-center"><span class="modal-title h3 text-center" id="ModelTitle' + t + '"> </span><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="ModelContainer' + t + '"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'), new DynamicModal(t) } } const AlertType = { Error: "alert-danger", Success: "alert-success", Info: "alert-info" }; var DynamicAlertCount = 0; class DynamicAlert { constructor() { this.ShowAlert = ((a, e = AlertType) => { t(DynamicAlertCount += 1), $("#DynamicAlert" + DynamicAlertCount).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-info"), $("#DynamicAlert" + DynamicAlertCount).addClass(e), $("#DynamicAlertMessage" + DynamicAlertCount).html(a) }), this.ShowAlertAjax = (a => { t(DynamicAlertCount += 1); var e = !1, l = !1; if ($("#DynamicAlert" + DynamicAlertCount).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-info"), null != a.StatusCode && "" != a.StatusDescription) return $("#DynamicAlertMessage" + DynamicAlertCount).html(a.StatusDescription), 500 == a.StatusCode ? (e = !0, $("#DynamicAlert" + DynamicAlertCount).addClass(AlertType.Error)) : 401 == a.StatusCode ? (l = !0, $("#DynamicAlert" + DynamicAlertCount).addClass(AlertType.Error), alert(a.StatusDescription)) : $("#DynamicAlert" + DynamicAlertCount).addClass(AlertType.Success), l && location.reload(), !e }); const t = t => { $("div#DynamicAlerts").append('<div class="col-12 alert alert-dismissible"  style="z-index:100000" Id="DynamicAlert' + t + '" ><div  style="padding-left: 10px;"  role="alert"><button class="close"  style="width:10px; height:10px;color:black;  padding-bottom: 19px;" type="button" data-dismiss="alert" aria-hidden="true"><span class="">x</span> </button> <span id="DynamicAlertMessage' + t + '"></span></div></div>') } } static init() { return 0 == $("#DynamicAlerts").length && $("body").prepend('<div id="DynamicAlerts" class="container-fluid stickytop"></div>'), new DynamicAlert } }
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
        this.showDynamicModal = (title = "", loadLink, params, modalSize = ModalSize, placeholderId, closeModal = true, ModalOnReadyCallBackFunction = () => { }, ModalAfterSubmitCallBackFunction = () => { }) => {
            $('.loadingContainer').show();
            $('#placeHolderId' + id).val(placeholderId);
            $('#placeHolderId' + id).attr('closeModal', closeModal);
            _formvalue = "";
            _submitted = false;


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
            $("#ModelContainer" + id + " > form").each(function () {

                jQuery.validator.unobtrusive.parse();
                //or to give the parser some context, supply it with a selector
                //jQuery validator will parse all child elements (deep) starting
                //from the selector element supplied
                if ($(this).attr('id') == undefined) {
                    $(this).attr('id', 'form1');
                }
                var formId = $(this).attr('id');

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
                                        changecolor(id);
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
                                changecolor(id);

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
        }
        var _formvalue = "";
        var _unsavedChanges = false;
        var _submitted = false;



        this.hideModal = () => {
            $('#DynamicModal' + this.Id).modal('hide');
        }

    }
    static init(id = "") {

        $('body').append('<div class="modal-dark modal fade" id="DynamicModal' + id + '" tabindex="-1" role="dialog" aria-labelledby="ModelTitle' + id + '" aria-hidden="true"><input type = "hidden" id = "placeHolderId' + id + '" /><div class="modal-dialog" role="document"><div class="modal-content" style="border: solid 1px;"><div class="modal-header text-center"><span class="modal-title h3 text-center" id="ModelTitle' + id + '"> </span><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="ModelContainer' + id + '"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>');
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
