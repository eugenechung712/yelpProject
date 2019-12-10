import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'project511-yelp/gql/queries/search';

export default Route.extend({
    apollo: queryManager(),
    queryParams: {
        term: {
          refreshModel: true
        }
      },

    model(params){
        let variables = { id: params.id};
        return this.apollo.watchQuery({ query, variables }, 'business');
    }
}); 
