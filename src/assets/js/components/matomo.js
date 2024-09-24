const {translateLine} = require('../customLineTranslation.js');  
  
  
    document.addEventListener('DOMContentLoaded', function() {                             

    const language = document.getElementsByTagName("html")[0].getAttribute("lang");

    var settings = {"showIntro":true,"divId":"matomo-opt-out","useSecureCookies":true,"cookiePath":null,"cookieDomain":null,"cookieSameSite":"Lax","OptOutComplete": translateLine("Opt-out complete; your visits to this website will not be recorded by the Web Analytics tool.", language),"OptOutCompleteBis": translateLine("Note that if you clear your cookies, delete the opt-out cookie, or if you change computers or Web browsers, you will need to perform the opt-out procedure again.", language),"YouMayOptOut2": translateLine("You may choose to prevent this website from aggregating and analyzing the actions you take here.", language),"YouMayOptOut3": translateLine("Doing so will protect your privacy, but will also prevent the owner from learning from your actions and creating a better experience for you and other users.", language),"OptOutErrorNoCookies":  translateLine("The tracking opt-out feature requires cookies to be enabled.", language), "OptOutErrorNotHttps":  translateLine("The tracking opt-out feature may not work because this site was not loaded over HTTPS. Please reload the page to check if your opt out status changed.", language), "YouAreNotOptedOut":  translateLine("You are not opted out.", language),"UncheckToOptOut": translateLine("Uncheck this box to opt-out.", language),"YouAreOptedOut": translateLine("You are currently opted out.", language),"CheckToOptIn": translateLine("Check this box to opt-in.", language)};  


    function showContent(consent, errorMessage = null, useTracker = false) {
  
        var errorBlock = '<p style="color: red; font-weight: bold;">';

        var div = document.getElementById(settings.divId);
        if (!div) {
            var warningDiv = document.createElement("div");
            var msg = 'Unable to find opt-out content div: "'+settings.divId+'"';
            warningDiv.id = settings.divId+'-warning';
            warningDiv.innerHTML = errorBlock+msg+'</p>';
            document.body.insertBefore(warningDiv, document.body.firstChild);
            console.log(msg);
            return;
        }
        
        if (!navigator || !navigator.cookieEnabled) {
            div.innerHTML = errorBlock+settings.OptOutErrorNoCookies+'</p>';
            return;
        }

        if (errorMessage !== null) {
            div.innerHTML = errorBlock+errorMessage+'</p>';
            return;
        }

        var content = '';        

        if (location.protocol !== 'https:') {
            content += errorBlock + settings.OptOutErrorNotHttps + '</p>';
        }

        if (consent) {
            if (settings.showIntro) {
                content += '<p>'+settings.YouMayOptOut2+' '+settings.YouMayOptOut3+'</p>';                       
            }
            if (useTracker) {
                content += '<input onclick="_paq.push([\'optUserOut\']);showContent(false, null, true);" id="trackVisits" type="checkbox" checked="checked" class="custom-checkbox__field" /><span class="custom-checkbox__content"></span>';
            } else {
                content += '<input onclick="window.MatomoConsent.consentRevoked();showContent(false);" id="trackVisits" type="checkbox" checked="checked" class="custom-checkbox__field" /><span class="custom-checkbox__content"></span>';
            }
            content += '<label class="custom-checkbox" for="trackVisits"><strong><span>'+settings.YouAreNotOptedOut+' '+settings.UncheckToOptOut+'</span></strong></label>';                               
        } else {
            if (settings.showIntro) {
                content += '<p>'+settings.OptOutComplete+' '+settings.OptOutCompleteBis+'</p>';
            }
            if (useTracker) {
                content += '<input onclick="_paq.push([\'forgetUserOptOut\']);showContent(true, null, true);" id="trackVisits" type="checkbox" class="custom-checkbox__field" /><span class="custom-checkbox__content"></span>';
            } else {
                content += '<input onclick="window.MatomoConsent.consentGiven();showContent(true);" id="trackVisits" type="checkbox" class="custom-checkbox__field" /><span class="custom-checkbox__content"></span>';
            }
            content += '<label class="custom-checkbox"  for="trackVisits"><strong><span>'+settings.YouAreOptedOut+' '+settings.CheckToOptIn+'</span></strong></label>';
        }                   
        div.innerHTML = content;      
    };   

    window.MatomoConsent = {                         
        cookiesDisabled: (!navigator || !navigator.cookieEnabled),        
        CONSENT_COOKIE_NAME: 'mtm_consent', CONSENT_REMOVED_COOKIE_NAME: 'mtm_consent_removed', 
        cookieIsSecure: false, useSecureCookies: true, cookiePath: '', cookieDomain: '', cookieSameSite: 'Lax',     
        init: function(useSecureCookies, cookiePath, cookieDomain, cookieSameSite) {
            this.useSecureCookies = useSecureCookies; this.cookiePath = cookiePath;
            this.cookieDomain = cookieDomain; this.cookieSameSite = cookieSameSite;
            if(useSecureCookies && location.protocol !== 'https:') {
                console.log('Error with setting useSecureCookies: You cannot use this option on http.');             
            } else {
                this.cookieIsSecure = useSecureCookies;
            }
        },               
        hasConsent: function() {
            var consentCookie = this.getCookie(this.CONSENT_COOKIE_NAME);
            var removedCookie = this.getCookie(this.CONSENT_REMOVED_COOKIE_NAME);
            if (!consentCookie && !removedCookie) {
                return true; // No cookies set, so opted in
            }
            if (removedCookie && consentCookie) {                
                this.setCookie(this.CONSENT_COOKIE_NAME, '', -129600000);              
                return false;
            }                
            return (consentCookie || consentCookie !== 0);            
        },        
        consentGiven: function() {                                                        
            this.setCookie(this.CONSENT_REMOVED_COOKIE_NAME, '', -129600000);
            this.setCookie(this.CONSENT_COOKIE_NAME, new Date().getTime(), 946080000000);
        },      
        consentRevoked: function() {    
            this.setCookie(this.CONSENT_COOKIE_NAME, '', -129600000);
            this.setCookie(this.CONSENT_REMOVED_COOKIE_NAME, new Date().getTime(), 946080000000);                
        },                   
        getCookie: function(cookieName) {            
            var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'), cookieMatch = cookiePattern.exec(document.cookie);
            return cookieMatch ? window.decodeURIComponent(cookieMatch[2]) : 0;
        },        
        setCookie: function(cookieName, value, msToExpire) {                       
            var expiryDate = new Date();
            expiryDate.setTime((new Date().getTime()) + msToExpire);            
            document.cookie = cookieName + '=' + window.encodeURIComponent(value) +
                (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
                ';path=' + (this.cookiePath || '/') +
                (this.cookieDomain ? ';domain=' + this.cookieDomain : '') +
                (this.cookieIsSecure ? ';secure' : '') +
                ';SameSite=' + this.cookieSameSite;               
            if ((!msToExpire || msToExpire >= 0) && this.getCookie(cookieName) !== String(value)) {
                console.log('There was an error setting cookie `' + cookieName + '`. Please check domain and path.');                
            }
        }
    }

    window.MatomoConsent.init(settings.useSecureCookies, settings.cookiePath, settings.cookieDomain, settings.cookieSameSite);    
    window.showContent= showContent;            
    showContent(window.MatomoConsent.hasConsent());    
    
  }); 