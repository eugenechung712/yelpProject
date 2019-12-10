import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'project511-yelp/gql/queries/search';
export default Route.extend({
    apollo: queryManager(),
    queryParams: {
       term:{
            refreshModel: true
        },
        location:{
            refreshModel: true
        },
        price:{
            refreshModel: true
        }
    },

    model(params){
        if (params.term&&params.location) {
        let variables = { term: params.term,
          location: params.location
        };
        return this.apollo.watchQuery({ query, variables }, 'search');
        }
    }
});
