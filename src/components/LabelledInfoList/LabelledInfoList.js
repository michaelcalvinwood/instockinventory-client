/*
 Note to Educators:
 We did the searching function as a quad-pair-programming exercise. Therefore, we left it as unassigned because it was full team effort. Everyone contributed equally.
 */

import React, { Component } from 'react';
import LabelledInfo from '../LabelledInfo/LabelledInfo';
import './LabelledInfoList.scss';
import deleteIcon from '../../assets/images/icons/delete_outline-24px.svg';
import editIcon from '../../assets/images/icons/edit-indigo.svg';
import { Link } from 'react-router-dom';
import sortIcon from '../../assets/images/icons/sort-24px.svg';
import activeSortIcon from '../../assets/images/icons/sort-active.svg'
import Delete from '../Delete/Delete';

class LabelledInfoList extends Component {

    state = {
        deleteActive: false,
        deleteType: '',
        deleteName: '',
        deleteId: '',
        activeSort: 0,
        sortAscending: true,
    }

    fourColumnInputs = data => {
        const { type, list } = this.props;

        let baseRoute = '';
        if (type === 'inventory') {
            baseRoute = '/inventory/';
        } else {
            baseRoute = '/warehouses/';
        }

        let hasSecondLine = false;
        list.forEach(data => {
            if (data.detail[0].line2 || data.detail[1].line2 || data.detail[2].line2 || data.detail[3].line2) {
                hasSecondLine = true;
            }
        });

        let firstPairClassName = 'labelled-info-list__first-pair';
        let secondPairClassName = 'labelled-info-list__second-pair';
        let activeItemsClassName = 'labelled-info-list__action-items';

        if (hasSecondLine) {
            firstPairClassName += ' labelled-info-list__first-pair--second-line';
            secondPairClassName += ' labelled-info-list__second-pair--second-line';
            activeItemsClassName += ' labelled-info-list__action-items--second-line';
        }
        return (
            <div className="labelled-info-list__item">
                <div className="labelled-info-list__pair-container">
                    <div className={firstPairClassName}>
                        <div className="labelled-info-list__detail0">
                            <LabelledInfo
                                label={data.detail[0].label}
                                line1={data.detail[0].line1}
                                line1To={data.detail[0].line1To}
                                line2={data.detail[0].line2}
                                line2To={data.detail[0].line2To}
                                fixed={false} />
                        </div>
                        <div className="labelled-info-list__detail1">
                            <LabelledInfo
                                label={data.detail[1].label}
                                line1={data.detail[1].line1}
                                line1To={data.detail[1].line1To}
                                line2={data.detail[1].line2}
                                line2To={data.detail[1].line2To}
                                fixed={false} />
                        </div>
                    </div>
                    <div className={secondPairClassName}>
                        <div className="labelled-info-list__detail2">
                            <LabelledInfo
                                label={data.detail[2].label}
                                line1={data.detail[2].line1}
                                line1To={data.detail[2].line1To}
                                line2={data.detail[2].line2}
                                line2To={data.detail[2].line2To}
                                fixed={false} />
                        </div>
                        <div className="labelled-info-list__detail3">
                            <LabelledInfo
                                label={data.detail[3].label}
                                line1={data.detail[3].line1}
                                line1To={data.detail[3].line1To}
                                line2={data.detail[3].line2}
                                line2To={data.detail[3].line2To}
                                fixed={false} />
                        </div>
                    </div>
                </div>
                <div className={activeItemsClassName}>

                    <img
                        onClick={() => { this.deleteItem(data.detail[0].line1, data.id) }}
                        className="labelled-info-list__delete"
                        src={deleteIcon} />

                    <Link to={baseRoute + data.id + '/edit'}>
                        <img
                            className="labelled-info-list__edit"
                            src={editIcon} />
                    </Link>
                </div>
            </div>
        )
    }

    fiveColumnInputs = data => {
        const { type, list } = this.props;

        let baseRoute = '';
        if (type === 'inventory') {
            baseRoute = '/inventory/';
        } else {
            baseRoute = '/warehouses/';
        }

        let hasSecondLine = false;
        list.forEach(data => {
            if (data.detail[0].line2 || data.detail[1].line2 || data.detail[2].line2 || data.detail[3].line2) {
                hasSecondLine = true;
            }
        });

        let firstPairClassName = 'labelled-info-list__first-pair';
        let secondPairClassName = 'labelled-info-list__second-pair';
        let activeItemsClassName = 'labelled-info-list__action-items';

        if (hasSecondLine) {
            firstPairClassName += ' labelled-info-list__first-pair--second-line';
            secondPairClassName += ' labelled-info-list__second-pair--second-line';
            activeItemsClassName += ' labelled-info-list__action-items--second-line';
        }

        return (
            <div className="labelled-info-list__item">
                <div className="labelled-info-list__pair-container">
                    <div className={firstPairClassName}>
                        <div className="labelled-info-list__detail0 labelled-info-list__detail0--has-fifth">
                            <LabelledInfo
                                label={data.detail[0].label}
                                line1={data.detail[0].line1}
                                line1To={data.detail[0].line1To}
                                line2={data.detail[0].line2}
                                line2To={data.detail[0].line2To}
                                fixed={false} />
                        </div>
                        <div className="labelled-info-list__detail1 labelled-info-list__detail1--has-fifth">
                            <LabelledInfo
                                label={data.detail[1].label}
                                line1={data.detail[1].line1}
                                line1To={data.detail[1].line1To}
                                line2={data.detail[1].line2}
                                line2To={data.detail[1].line2To}
                                fixed={false} />
                        </div>
                    </div>
                    <div className={secondPairClassName}>
                        <div className="labelled-info-list__detail2 labelled-info-list__detail2--has-fifth">
                            <LabelledInfo
                                label={data.detail[2].label}
                                line1={data.detail[2].line1}
                                line1To={data.detail[2].line1To}
                                line2={data.detail[2].line2}
                                line2To={data.detail[2].line2To}
                                fixed={false} />
                        </div>
                        <div className="labelled-info-list__detail3 labelled-info-list__detail3--has-fifth">
                            <LabelledInfo
                                label={data.detail[3].label}
                                line1={data.detail[3].line1}
                                line1To={data.detail[3].line1To}
                                line2={data.detail[3].line2}
                                line2To={data.detail[3].line2To}
                                fixed={false} />
                        </div>
                        <div className="labelled-info-list__detail4 labelled-info-list__detail4--has-fifth">
                            <LabelledInfo
                                label={data.detail[4].label}
                                line1={data.detail[4].line1}
                                line1To={data.detail[4].line1To}
                                line2={data.detail[4].line2}
                                line2To={data.detail[4].line2To}
                                fixed={false} />
                        </div>
                    </div>
                </div>
                <div className={activeItemsClassName}>

                    <img
                        onClick={() => { this.deleteItem(data.detail[0].line1, data.id) }}
                        className="labelled-info-list__delete"
                        src={deleteIcon} />

                    <Link to={baseRoute + data.id + '/edit'}>
                        <img
                            className="labelled-info-list__edit"
                            src={editIcon} />
                    </Link>
                </div>
            </div>
        )
    }

    setSort = column => {
        if (this.state.activeSort !== column) {
            this.setState({
                activeSort: column,
                sortAscending: true
            })

            return;
        }

        let newState = !this.state.sortAscending;

        this.setState({
            sortAscending: newState,
        })
    }

    filterTable = data => {
        if (!this.props.search) return true;

        let numColumns = 4;

        if (data.detail[4]) {
            numColumns = 5;
        }

        const searchTerm = this.props.search.toLowerCase();

        for (let i = 0; i < numColumns; ++i) {
            if ((data.detail[i].line1.toLowerCase().indexOf(searchTerm)) !== -1) {
                return true;
            }
            if ((data.detail[i].line2.toLowerCase().indexOf(searchTerm)) !== -1) {
                return true;
            }
        }

        return false;
    }

    deleteItem = (name, id) => {
        this.setState({
            deleteActive: true,
            deleteType: this.props.type,
            deleteName: name,
            deleteId: id
        })
    }

    turnOffDelete = () => {
        this.setState({
            deleteActive: false
        });
        this.props.refresh();
    }

    render() {
        const { type, list } = this.props;

        if (!list.length) {
            return (
                <div className="labelled-info-list__no-content">No content.</div>
            )
        }

        let baseRoute = '';
        if (type === 'inventory') {
            baseRoute = '/inventory/';
        } else {
            baseRoute = '/warehouses/';
        }

        let hasSecondLine = false;
        list.forEach(data => {
            if (data.detail[0].line2 || data.detail[1].line2 || data.detail[2].line2 || data.detail[3].line2) {
                hasSecondLine = true;
            }
        });

        let firstPairClassName = 'labelled-info-list__first-pair';
        let secondPairClassName = 'labelled-info-list__second-pair';
        let activeItemsClassName = 'labelled-info-list__action-items';

        if (hasSecondLine) {
            firstPairClassName += ' labelled-info-list__first-pair--second-line';
            secondPairClassName += ' labelled-info-list__second-pair--second-line';
            activeItemsClassName += ' labelled-info-list__action-items--second-line';
        }

        let warehouseClassName = 'labelled-info-list__warehouse';
        let inventoryItemClassName = "labelled-info-list__inventory-item";
        let categoryClassName = "labelled-info-list__category";
        let statusClassName = "labelled-info-list__status";
        let quantityClassName = "labelled-info-list__quantity";
        let actionsClassName = "labelled-info-list__actions";

        if (list[0].detail[4]) {
            inventoryItemClassName += " labelled-info-list__inventory-item--has-fifth";
            categoryClassName += " labelled-info-list__category--has-fifth";
            statusClassName += " labelled-info-list__status--has-fifth";
            quantityClassName += " labelled-info-list__quantity--has-fifth";
            actionsClassName += " labelled-info-list__actions--has-fifth";

        } else {
            warehouseClassName += ' labelled-info-list__warehouse--disabled';
        }

        return (
            <>
                {this.state.deleteActive ? <Delete type={this.state.deleteType} name={this.state.deleteName} id={this.state.deleteId} turnOff={this.turnOffDelete} /> : <div></div>}
                <div className="labelled-info-list">
                    <div className="labelled-info-list__heading-action-container">
                        <div className="labelled-info-list__heading">
                            <div className={inventoryItemClassName}>
                                <p className="labelled-info-list__label-1">
                                    {list[0].detail[0].label}
                                </p>
                                <img
                                    onClick={() => this.setSort(0)}
                                    className="labelled-info-list__sort-icon"
                                    src={this.state.activeSort === 0 ? activeSortIcon : sortIcon} />
                            </div>
                            <div className={categoryClassName}>
                                <p className="labelled-info-list__label-2">
                                    {list[0].detail[1].label}
                                </p>
                                <img
                                    className="labelled-info-list__sort-icon"
                                    onClick={() => this.setSort(1)}
                                    src={this.state.activeSort === 1 ? activeSortIcon : sortIcon} />
                            </div>
                            <div className={statusClassName}>
                                <p className="labelled-info-list__label-3">
                                    {list[0].detail[2].label}
                                </p>
                                <img className="labelled-info-list__sort-icon"
                                    onClick={() => this.setSort(2)}
                                    src={this.state.activeSort === 2 ? activeSortIcon : sortIcon} />
                            </div>
                            <div className={quantityClassName}>
                                <p className="labelled-info-list__label-4">
                                    {list[0].detail[3].label}
                                </p>
                                <img className="labelled-info-list__sort-icon"
                                    onClick={() => this.setSort(3)}
                                    src={this.state.activeSort === 3 ? activeSortIcon : sortIcon} />
                            </div>
                            <div className={warehouseClassName}>
                                <p className="labelled-info-list__label-5">
                                    {list[0].detail[4] ? list[0].detail[4].label : ''}
                                </p>
                                <img className="labelled-info-list__sort-icon"
                                    onClick={() => this.setSort(4)}
                                    src={this.state.activeSort === 4 ? activeSortIcon : sortIcon} />
                            </div>

                        </div>
                        <div className={actionsClassName}>
                            <p className="labelled-info-list__label-5">
                                ACTIONS
                            </p>
                        </div>
                    </div>
                    {
                        list
                            .sort((a, b) => {
                                if (a.detail[this.state.activeSort].line1 < b.detail[this.state.activeSort].line1) {
                                    return this.state.sortAscending ? -1 : 1;
                                }
                                if (a.detail[this.state.activeSort].line1 > b.detail[this.state.activeSort].line1) {
                                    return this.state.sortAscending ? 1 : -1;
                                }
                                return 0;
                            })
                            .filter(data => {
                                if (!this.props.search) return true;

                                let numColumns = 4;

                                if (data.detail[4] !== undefined) {
                                    numColumns = 5;
                                }

                                const searchTerm = this.props.search.toLowerCase();

                                for (let i = 0; i < numColumns; ++i) {
                                    if ((data.detail[i].line1.toString().toLowerCase().indexOf(searchTerm)) !== -1) {
                                        return true;
                                    }
                                    if ((data.detail[i].line2.toString().toLowerCase().indexOf(searchTerm)) !== -1) {
                                        return true;
                                    }
                                }

                                return false;
                            })
                            .map(data => {
                                if (!data.detail[4]) {
                                    return this.fourColumnInputs(data);
                                }
                                else {
                                    return this.fiveColumnInputs(data);
                                }
                            })

                    }
                </div>
            </>
        )
    }
}

export default LabelledInfoList