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

import RelatedItem from '../RelatedItem/RelatedItem';

export interface IRelatedItemsFieldCustomizerProps {
  targetListName: string;
  filterFieldName: string;
  displayFieldName: string;
  currentItemId: number;
  buttonText: string;
  additionalFilter: string;
  showAuthor: boolean;
  showCreatedDate: boolean;
}

export interface IRelatedItemsFieldCustomizerState {
  relatedItems: any[];
  isOpen: boolean;
}

const LOG_SOURCE: string = 'RelatedItemsFieldCustomizer';

export default class RelatedItemsFieldCustomizer extends React.Component<IRelatedItemsFieldCustomizerProps, IRelatedItemsFieldCustomizerState> {

  constructor(props) {
    super(props);
    this.state = {
      relatedItems: [],
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
          {
            this.state.relatedItems.map((item) => {
              return (<RelatedItem msg={item[this.props.displayFieldName]} author={item.Author.Title} showAuthor={this.props.showAuthor} date={item.Created} showDate={this.props.showCreatedDate} />);
            })
          }
        </Panel>
      </div>
    );
  }

  private showItems = (e) => {
    this.getRelatedItems();
  }

  private async getRelatedItems() {

    let relatedItems: any[];
    const displayFieldName = this.props.displayFieldName || 'Title';

    if (this.props.additionalFilter == "") {
      relatedItems = await sp.web.lists.getByTitle(this.props.targetListName)
        .items
        .filter(this.props.filterFieldName + ' eq ' + this.props.currentItemId)
        .select('Created', 'Author/Title', this.props.filterFieldName, displayFieldName)
        .expand('Author')
        .get();
    }
    else {
      relatedItems = await sp.web.lists.getByTitle(this.props.targetListName)
        .items
        .select('Created', 'Author/Title', this.props.filterFieldName, displayFieldName)
        .filter(this.props.filterFieldName + ' eq ' + this.props.currentItemId + ' and ' + this.props.additionalFilter)
        .expand('Author')
        .get();
    }

    this.setState({
      relatedItems: relatedItems,
      isOpen: true
    });

  }
}
