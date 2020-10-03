import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './RelatedItemsFieldCustomizer.module.scss';

import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';

export interface IRelatedItemsFieldCustomizerProps {
  targetListName: string;
  targetListFilterFieldName: string;
  currentItemId: number;
  buttonText: string;
}

export interface IRelatedItemsFieldCustomizerState {
  relatedItemsSummary: string;
  isOpen: boolean;
}

const LOG_SOURCE: string = 'RelatedItemsFieldCustomizer';

export default class RelatedItemsFieldCustomizer extends React.Component<IRelatedItemsFieldCustomizerProps, IRelatedItemsFieldCustomizerState> {

  constructor(props) {
    super(props);
    this.state = {
      relatedItemsSummary: "",
      isOpen: false
    };
  }
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: RelatedItemsFieldCustomizer mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: RelatedItemsFieldCustomizer unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {

    return (
      <div className={styles.cell}>
        <DefaultButton onClick={this.showItems} text={this.props.buttonText} className={styles.btn} /> 

        <Panel 
          headerText="Related Items"
          isOpen={this.state.isOpen}
          closeButtonAriaLabel="Close"
          isLightDismiss={true}
          >
            {this.state.relatedItemsSummary}
          </Panel>
      </div>
    );
  }

  private showItems = (e) =>{
    this.getRelatedItems();
  }

  private async getRelatedItems() {

    let relatedItems: any[];

    relatedItems = await sp.web.lists.getByTitle(this.props.targetListName)
      .items
      .filter(this.props.targetListFilterFieldName + ' eq ' + this.props.currentItemId)
      .get();

    let summary = relatedItems.map((item) => {
      return item.Title;
    });

    this.setState({
      relatedItemsSummary: summary.toString(),
      isOpen: true
    });

  }
}
