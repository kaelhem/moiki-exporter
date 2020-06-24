import React, { useState, useEffect } from 'react'
import { Page, Text, Image, Document, View, StyleSheet, Font, Link } from '@react-pdf/renderer'
import { utils } from 'moiki-exporter'
const { getAuthor, simplifyStory } = utils

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  pages: {
    padding: 35,
    paddingBottom: 55
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Times-Roman'
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    marginBottom: 2,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  choice: {
    margin: 2,
    fontSize: 14,
    color: '#666',
    fontWeight: 'bolder',
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 50,
  },
  imageAction: {
    marginVertical: 5,
    marginHorizontal: 130,
  },
  legendAction: {
    marginTop: 2,
    marginBottom: 20,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    color: '#666'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  titleHeader: {
    fontSize: 8,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    minHeight: 20
  },
  link: {
    textAlign: 'center',
    textDecoration: 'none',
    border: 'none',
    fontSize: 11
  }
})

const cleanContent = content => {
  return content
    .replace(/(<(strong|b)>\s)/gi, ' <b>')
    .replace(/(\s<\/(strong|b)>)/gi, '</b> ')
    .replace(/(<em>\s)/gi, ' ')
    .replace(/(\s<\/em>)/gi, ' ')
    .replace(/(<([/]*)(strong|b)>)/gi, '')
    .replace(/(<([/]*)(em)>)/gi, '')
    .replace(/<\/p>/gi, '</p> ')
    .replace(/(<([/p]+)>)/gi, '')
    .replace(/(<([/]*)(span)>)/gi, '')
    .replace(/(<([/]*)h([1-6]{1})>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/<br(\s)*>/gi, '<br/>')
    .replace(/(\s)+/gi, ' ')
    .replace(/(\s)*&nbsp;(\s)*/gi, '\u00A0')
    .trim()
}

let numCalls = 0
let referencesPageNum = {}

export const StoryAsPdf = ({story}) => {
  const { meta, assets } = story
  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = asset
  }
  const sequences = simplifyStory(story, variables, cleanContent)

  /*
  Allow to manage page number in links
  */
  const [pageForSequences, setPageForSequences] = useState({})
  useEffect(() => {
    numCalls = 0
    referencesPageNum = {}
  }, [])
  
  const updatePageForSequences = (id, pageNum, totalPages) => {
    if (totalPages && referencesPageNum[id] !== pageNum) {
      referencesPageNum[id] = pageNum
      if (++numCalls === sequences.length) {
        setPageForSequences(referencesPageNum)
      }
    }
  }

  const getSequenceByIndex = (id) => (sequences.findIndex(s => s.id === id) + 1)

  const Sequence = ({sequence}) => {
    const lastEntry = sequence.chain.reverse()[0]
    const firstSequence = sequence.chainedContent.slice(0, 1)
    const followingSequences = sequence.chainedContent.slice(1)
    const hasChoices = lastEntry.choices && lastEntry.choices.length > 0
    return (
      <View>
        <Text minPresenceAhead={1} id={sequence.id} style={{ height: 0 }} render={({ pageNumber, totalPages }) => {
          updatePageForSequences(sequence.id, pageNumber, totalPages)
          return ''
        }} />
        <Text key={'seq-' + sequence.id} style={{...styles.text, marginTop: 30, marginBottom: 15}}>
          <Text style={styles.subtitle}>{getSequenceByIndex(sequence.id) + '\u00A0\u00A0\u00A0'}</Text>
          { firstSequence }
        </Text>
        {followingSequences && followingSequences.map((content, contentIdx) => {
          if (typeof content === 'string') {
            return (
              <Text key={'seq-' + contentIdx} style={styles.text}>{content}</Text>
            )
          } else {
            return (
              <View key={'seq-' + contentIdx}>
                <Image style={styles.imageAction} src={content.pngIcon} />
                <Text style={styles.legendAction}>{content.desc.trim()}</Text>
              </View>
            )
          }
        })}
        <View wrap={false}>
          { hasChoices && lastEntry.choices.map((choice, choiceIdx) => (
            <View key={'ch-' + choiceIdx} wrap={false}>
              <Text style={{...styles.choice, marginTop: choiceIdx === 0 ? 10 : 2}}>
                {choice.content}
              </Text>
              { choice.condition && choice.condition.next && choice.condition.params ? (
                <View wrap={false}>  
                  <Link style={styles.link} href={'#' + choice.condition.next}>
                    Avec l'objet "{variables[choice.condition.params].desc.trim()}" : aller en {getSequenceByIndex(choice.condition.next)} (p.{pageForSequences[choice.condition.next] || ''})
                  </Link>
                  <Link style={{...styles.link, marginTop: 3}} href={'#' + choice.next}>
                    Sinon : aller en {getSequenceByIndex(choice.next)} (p.{pageForSequences[choice.next] || ''})
                  </Link>
                </View>
              ) : (
                <Link style={styles.link} href={'#' + choice.next}>
                  Aller en {getSequenceByIndex(choice.next)} (p.{pageForSequences[choice.next] || ''})
                </Link>
              )}
            </View>
          ))}
          { (!hasChoices && lastEntry.condition && lastEntry.condition.params && lastEntry.condition.next) && (
            <View wrap={false}>
              <Link style={styles.link} href={'#' + lastEntry.condition.next}>
                Avec l'objet "{variables[lastEntry.condition.params].desc.trim()}" : aller en {getSequenceByIndex(lastEntry.condition.next)} (p.{pageForSequences[lastEntry.condition.next] || ''})
              </Link>
              <Link style={{...styles.link, marginTop: 3}} href={'#' + lastEntry.next}>
                Sinon : aller en {getSequenceByIndex(lastEntry.next)} (p.{pageForSequences[lastEntry.next] || ''})
              </Link>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <Document>
      <Page size="A5" style={styles.body}>
        <Text style={styles.header}>
          Moiki présente
        </Text>
        <Text style={styles.title}>{meta.name}</Text>
        <Text style={styles.author}>{ getAuthor(meta) }</Text>
        { meta.image && (
          <Image
            style={styles.image}
            src={meta.image}
          />
        )}
        <Text style={styles.description}>
          { meta.description }
        </Text>
      </Page>
      <Page size="A5" style={styles.pages}>
        <Text style={styles.titleHeader} fixed>
          {meta.name}
        </Text>
        { sequences && sequences.map((sequence, idx) => (
          <Sequence key={'seq-' + idx} sequence={sequence} />
        ))}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}