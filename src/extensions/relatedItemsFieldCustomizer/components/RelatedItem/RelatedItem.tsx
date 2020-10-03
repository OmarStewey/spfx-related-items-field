import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './RelatedItem.module.scss';


export interface IRelatedItemProps {
    msg: string;
    date: Date;
    author: string;
    showDate: boolean;
    showAuthor: boolean;
}


const LOG_SOURCE: string = 'RelatedItemsFieldCustomizer';

export default class RelatedItemsFieldCustomizer extends React.Component<IRelatedItemProps, {}> {

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
            <div className={styles.msgblock}>
                <div className={styles.msg}>{this.props.msg}</div>
                <div className={this.props.showAuthor ? styles.author : 'hidden'}>{this.props.author}</div>
                <div className={this.props.showDate ? styles.date : 'hidden'}>{this.props.date}</div>
            </div>
        );
    }

}
