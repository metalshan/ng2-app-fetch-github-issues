export class Utils{

	//this method adds up client id and client secret
	public formatUrl(url){
		var formattedUrl = this.setParameter(url, "client_id", "7e72c7704866679a9d58");
		formattedUrl = this.setParameter(url, "client_secret", "6f209a240c4e4dcd9e8c6a13705951cf82e7be50");

		return formattedUrl;
	}

	//a function to put params
	setParameter(url, paramName, paramValue)
	{
	    if (url.indexOf(paramName + "=") >= 0)
	    {
	        var prefix = url.substring(0, url.indexOf(paramName));
	        var suffix = url.substring(url.indexOf(paramName));
	        suffix = suffix.substring(suffix.indexOf("=") + 1);
	        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
	        url = prefix + paramName + "=" + paramValue + suffix;
	    }
	    else
	    {
	    if (url.indexOf("?") < 0)
	        url += "?" + paramName + "=" + paramValue;
	    else
	        url += "&" + paramName + "=" + paramValue;
	    }
	    return url;
	}
}