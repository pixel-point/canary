import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
  Text,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@harnessio/canary'

type KeyValuePair = {
  name: string
  value: string | KeyValuePair[]
}

interface KeyValueTableProps {
  tableTitleName: string
  tableTitleVal: string
  className?: string
  tableSpec: KeyValuePair[]
}

export const KeyValueTable: React.FC<KeyValueTableProps> = ({
  className,
  tableTitleName,
  tableTitleVal,
  tableSpec
}) => {
  // ToDO:const getAccordian = () => <div></div> // do this function recursively
  return (
    <div className="overflow-x-auto pt-4">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                {tableTitleName}
              </Text>
            </TableHead>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                {tableTitleVal}
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Todo: currently for the simple data, will add more accdordin sec with recursive data */}
          {Array.isArray(tableSpec) &&
            tableSpec.map((item, index: number) => {
              //make the detection better
              if (typeof item.value === 'string') {
                return (
                  <TableRow key={index}>
                    <TableCell className="pt-2.5 pl-4 w-1/2">
                      <Text size={2} weight="normal" className="text-ring">
                        {item.name}
                      </Text>
                    </TableCell>
                    <TableCell className="pt-2.5 w-1/2">
                      <Text size={2} weight="normal" className="text-ring">
                        {item.value}
                      </Text>
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          {/* // currently low level for nested accordions-successfully
              // Todo: render span first recurively and then add the accordion */}
          <TableRow key="test">
            <TableCell colSpan={2} className="p-0">
              <Accordion collapsible type="single">
                <AccordionItem value="specs">
                  <AccordionTrigger className="w-full pt-2 pb-2 pl-4 flex">
                    <Text
                      size={2}
                      weight="normal"
                      className="text-ring text-left"
                      style={{ color: 'rgba(147, 147, 159, 1)' }}>
                      specs
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent className="w-full pl-0 pr-0">
                    <ul className="border-b">
                      <li className="p-2.5 pl-8 inline-block w-1/2">
                        <Text size={2} weight="normal" className="text-ring">
                          this is spec test col1
                        </Text>
                      </li>
                      <li className="p-2.5 inline-block w-1/2">
                        <Text size={2} weight="normal" className="text-ring">
                          this is spec test value col1
                        </Text>
                      </li>
                    </ul>
                    <ul className="border-b">
                      <li className="p-2.5 pl-8 inline-block w-1/2">
                        <Text size={2} weight="normal" className="text-ring">
                          this is spec test col2
                        </Text>
                      </li>
                      <li className="p-2.5 inline-block w-1/2">
                        <Text size={2} weight="normal" className="text-ring">
                          this is spec test value col2
                        </Text>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
