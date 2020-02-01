import React from 'react'
import { ReactiveBase, DataSearch, MultiList, ReactiveList, SingleRange, ResultCard, SelectedFilters, } from '@appbaseio/reactivesearch';
// import { connect } from 'react-redux';
// import connect from 'react-redux'

const Main = () => (
    <ReactiveBase app="good-books-ds" credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d">
        <div className="row">
            <div className="col-md-12 search-field">
                <DataSearch title="DataSearch" dataField={['original_title', 'original_title.search']}
                    categoryField="authors.raw" componentId="BookSensor" URLParams />
            </div>

            <div className="">
                <MultiList
                    componentId="genres-list"
                    dataField="genres_data.raw"
                    className="genres-filter"
                    size={20}
                    sortBy="asc"
                    queryFormat="or"
                    selectAllLabel="All Genres"
                    showCheckbox={true}
                    showCount={true}
                    showSearch={true}
                    placeholder="Search for a Genre"
                    react={{
                        and: [
                            "mainSearch",
                            "results",
                            "date-filter",
                            "RangeSlider",
                            "language-list",
                            "revenue-list"
                        ]
                    }}
                    showFilter={true}
                    filterLabel="Genre"
                    URLParams={false}
                    innerClass={{
                        label: "list-item",
                        input: "list-input"
                    }}
                />
            </div>


            <div className="col">
                <SelectedFilters />
                <ReactiveList componentId="SearchResult" dataField="original_title" size={10}
                    className="result-list-container" pagination
                    react={{
                        and: 'BookSensor',
                    }}
                    render={({ data }) => (
                        <ReactiveList.ResultCardsWrapper>
                            {data.map(item => (
                                <ResultCard key={item.id}>
                                    <ResultCard.Image src={item.image} />
                                    <ResultCard.Title>
                                        <div
                                            className="book-title"
                                            dangerouslySetInnerHTML={{
                                                __html: item.original_title,
                                            }}
                                        />
                                    </ResultCard.Title>

                                    <ResultCard.Description>
                                        <div className="flex column justify-space-between">
                                            <div>
                                                <div>
                                                    by{' '}
                                                    <span className="authors-list">
                                                        {item.authors}
                                                    </span>
                                                </div>
                                                <div className="ratings-list flex align-center">
                                                    <span className="stars">
                                                        {Array(item.average_rating_rounded)
                                                            .fill('x')
                                                            .map((item, index) => (
                                                                <i
                                                                    className="fas fa-star"
                                                                    key={index}
                                                                />
                                                            )) // eslint-disable-line
                                                        }
                                                    </span>
                                                    <span className="avg-rating">
                                                        ({item.average_rating} avg)
													</span>
                                                </div>
                                            </div>
                                            <span className="pub-year">
                                                Pub {item.original_publication_year}
                                            </span>
                                        </div>
                                    </ResultCard.Description>
                                </ResultCard>
                            ))}
                        </ReactiveList.ResultCardsWrapper>
                    )}
                />
            </div>

        </div>
    </ReactiveBase>
);

export default Main;



