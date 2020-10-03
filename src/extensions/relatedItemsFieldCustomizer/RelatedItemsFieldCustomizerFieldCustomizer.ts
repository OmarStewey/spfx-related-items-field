import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'RelatedItemsFieldCustomizerFieldCustomizerStrings';
import RelatedItemsFieldCustomizer, { IRelatedItemsFieldCustomizerProps } from './components/RelatedItemsField/RelatedItemsFieldCustomizer';

export interface IRelatedItemsFieldCustomizerFieldCustomizerProperties {
  
  targetListName: string;
  targetListFilterFieldName: string;
  targetListDisplayFieldName: string;
  buttonLabelText: string;
  additionalFilterQuery: string;
  showAuthor: boolean;
  showCreatedDate: true;

}

const LOG_SOURCE: string = 'RelatedItemsFieldCustomizerFieldCustomizer';

export default class RelatedItemsFieldCustomizerFieldCustomizer
  extends BaseFieldCustomizer<IRelatedItemsFieldCustomizerFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    
    Log.info(LOG_SOURCE, 'Activated RelatedItemsFieldCustomizerFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "RelatedItemsFieldCustomizerFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    
    const relatedItemsFieldCustomizer: React.ReactElement<{}> =
      React.createElement(RelatedItemsFieldCustomizer, { 
        targetListName: this.properties.targetListName,
        filterFieldName: this.properties.targetListFilterFieldName,
        displayFieldName: this.properties.targetListDisplayFieldName,
        currentItemId: event.listItem.getValueByName("ID"),
        buttonText: this.properties.buttonLabelText,
        additionalFilter: this.properties.additionalFilterQuery,
        showAuthor: this.properties.showAuthor,
        showCreatedDate: this.properties.showCreatedDate
       } as IRelatedItemsFieldCustomizerProps);

    ReactDOM.render(relatedItemsFieldCustomizer, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
