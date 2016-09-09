# firebolt-app
Front end application to find malware on a system

Written in Meteorjs, blaze, and uses nodejs

-----------

mapping:

PUT /firebolt
{
  "mappings": {
    "endpoint": {
      "date_detection": false,
      "properties": {
        "hostname": { "type": "string", "index": "not_analyzed"  },
        "filename":  { "type": "string", "index": "not_analyzed" },
        "hash": { "type": "string"  },
        "category": { "type": "string" },
        "path": { "type": "string", "index": "not_analyzed" },
        "kaspersky" : { "type": "string", "index": "not_analyzed" },
        "trendMicro" :{ "type": "string", "index": "not_analyzed" },
        "sophos" : { "type": "string", "index": "not_analyzed" },
        "mcafee" : { "type": "string", "index": "not_analyzed" },
        "malwarebytes" : { "type": "string", "index": "not_analyzed" },
        "gen_date": {
                        "type": "date",
                        "format": "yyyy-MM-dd"
                    }
      }

    }
  }
}
