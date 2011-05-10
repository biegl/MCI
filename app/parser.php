<?php
require_once 'simple_html_dom.php';

class ScheduleParser
{
    public function getDom($search)
    {
        $dom = new simple_html_dom('http://www.mci4me.at/mci4me/app/main?DOCID=100152874' . '&filter=' . $search);
        return $dom;
        
    }
    
    public function getEntries(simple_html_dom $dom)
    {
        $entries = array();
        $skipedFirst = false;
        $tableEntries = $dom->find('table[class=linedTable] tbody', 0)->children();
        unset($tableEntries[0]);

        foreach ($tableEntries as $child) {
               foreach ($child->children() as $element) {
               $array = array();
							 $array['date'] = $element->children(0)->innertext;
               $array['from'] = $element->children(1)->innertext;
               $array['to'] = $element->children(3)->innertext;  
               $array['title'] = $element->children(4)->innertext;
               $array['group'] = $element->children(5)->innertext;  
               $array['lecturer'] = $element->children(6)->innertext;
               $array['room'] = $element->children(7)->innertext;    
               $array['location'] = $element->children(8)->innertext; 
               $entries[] = $array;           
            } 
        }
				$json = json_encode($entries);
        return $json;
    }
}