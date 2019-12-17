import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'project511-yelp/gql/queries/search';

export default Route.extend({
    queryParams:{
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

    apollo: queryManager(),

    model(params){
            const variables = {
                term: params.term,
                location: (params.location || "New York"),
                price: params.price
            };
            return this.apollo.watchQuery({ query, variables }, 'search');
        }
});
