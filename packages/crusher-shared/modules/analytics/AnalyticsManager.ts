// @ts-nocheck
const AnalyticsNode = require('analytics-node');
import getMAC from 'getmac'

const devKey = 'IM0t0F7DFPxWwbDrd8WStLqOjJYLYuaq'
var analytics = new AnalyticsNode(process.env.SEGMENT_API_KEY || devKey, {flushAfter: 5, flushInterval: 3});

const getUniqueID =  ()=>{
    if (typeof window === 'undefined'){
       return getMAC();
    }

    // In browser docs, a new user is generated by segment.
    return null;  
}   

const getAnalyticsObj = ()=>{
    if (typeof window === 'undefined'){
        return analytics
    }
    //ts-ignore
    return window['analytics'];
}

export class Analytics{
    // Use later on, give option to not track user
    shouldTrack:boolean = true;

    // Use later on, give option to not track user
    static disabledTelemetry:boolean = false;

    clientType: 'web' | 'node';
    clientName: 'cli' | 'electron-app' | 'web-app' | 'docs' | 'website';
    static analyticsObj = getAnalyticsObj();

    static track({userId = null, event,properties}){
        if(Analytics.disabledTelemetry) return;

        Analytics.analyticsObj.track({
            userId,
            anonymousId: getUniqueID(),
            event, 
            properties
        })
    }

    static trackProject({groupId, event, ...properties}){
        if(Analytics.disabledTelemetry) return;
        Analytics.analyticsObj.identify({userID: `gp-${groupId}`, event, ...properties})
    }

    static identifyUser({
        userId, anonymousId = getUniqueID()
    }){
        if(Analytics.disabledTelemetry) return;
        Analytics.analyticsObj.identify({userId,anonymousId});
    }

    static identifyGroup({
        groupId
    }){
        if(Analytics.disabledTelemetry) return;
        Analytics.analyticsObj.identify({groupId});
    }
}