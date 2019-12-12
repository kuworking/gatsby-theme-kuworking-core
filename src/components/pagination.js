import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { Text } from '../utils/config'
import { ArrowAltCircleLeft } from 'emotion-icons/fa-solid'
import { ArrowAltCircleRight } from 'emotion-icons/fa-solid'

export const Pagination = ({ pagination: { isFirst, isLast, prev_page, next_page, num_of_pages, pre_path } }) => (
  <Wrapper>
    {!isFirst && (
      <Link id="pagination-prev" aria-label={Text.pagination.previous} to={prev_page} rel="prev">
        <Button aria-label="Previous">
          <Icon>
            <ArrowAltCircleLeft />
          </Icon>
          {Text.pagination.previous}
        </Button>
      </Link>
    )}
    {!isLast && (
      <Link id="pagination-next" aria-label={Text.pagination.next} to={next_page} rel="next">
        <Button aria-label="Next">
          {Text.pagination.next}
          <Icon>
            <ArrowAltCircleRight />
          </Icon>
        </Button>
      </Link>
    )}
    {Array.from(Array(num_of_pages)).forEach((_, i) => (
      <Link id={'pagination-' + i} aria-label="Paginación" to={`${pre_path}/${i === 0 ? '' : i + 1}`}>
        {i + 1}
      </Link>
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
`

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #ddd;
  outline: 0;
  border: none;
  padding: 0.8em 1.5em 0.8em;
  text-transform: none;
  font-weight: 700;
  text-decoration: none;
  line-height: 1em;
  border-radius: 6px;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  user-select: none;
  &:hover {
    background-color: #ffbdbddb;
    color: #000000cc;
  }
`

export const Icon = styled.div`
  & > svg {
    display: inline-block;
    font-size: 1.3em;
    font-weight: 400;
    text-align: center;
    margin: 0 0.25rem;
    max-height: 1em;
    max-width: 1em;
    height: 1em;
    padding: 0;
  }
`
